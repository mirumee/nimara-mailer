import http, { type IncomingMessage } from "http";

import { CONFIG } from "@/config";
import { handler, logger } from "@/emails-sender";
import { getJSONFormatHeader } from "@/lib/saleor/apps/utils";

/**
{
    "format":"application/vnd.mirumee.nimara.event_proxy.v1+json",
    "event":{
        "Records":[
            {
                "messageId":"231b2b63-61d7-4aee-8c5f-41ec515637e5",
                "receiptHandle":"AQEBuKEWUWVS2EIIN6TH3tCvQUS0u9ZnBihWHNuIiHN2pi7UZ2FqZgwvYOpuraVopaN2fVdoCuqSHIfQyYk/YviQLWiQkItLVV7UygQ8pM+lTuCbBFQkIEP9fMA25mHojkR2PROb2Jz+nZb3tQl/LZ1QjR+Y97cpBTegTeEHCnf2IJc/3TxWV3UuNid+BCTfW/2stA2xy5y5BjBHkxO9nG62ohD7abxOyWXXKEQAjtjI9WwVsF4MLSTUgP9n6rY417NRJIXzMvE1lJa+oli/U0IJllLcihchupoHn3VsniFFr2GOu4EUZPZ9SU5aM7y0pAsstHlQrqpdW+4en3LJbZ/acmhw01N4ABPeSND+md0+6cKnW5lqY9ShfBgz/FXCFNl3KNn5XSfhtmisKO0+GjezBg==",
                "body":"example body",
                "attributes":{
                    "ApproximateReceiveCount":"1",
                    "SentTimestamp":"1725968725915",
                    "SenderId":"AROAY2QPQY6ZKITOQN3Q4:piotr.grundas@mirumee.com",
                    "ApproximateFirstReceiveTimestamp":"1725968725922"
                },
                "messageAttributes":{

                },
                "md5OfBody":"358f217052892dd75464e55c13cbde78",
                "eventSource":"aws:sqs",
                "eventSourceARN":"arn:aws:sqs:eu-central-1:606696687538:peteTSBEApp",
                "awsRegion":"eu-central-1"
            }
        ]
    }
}
*/

const proxyEventToLambdaHandler = async (request: IncomingMessage) => {
  /**
   * Passthrough event data from the event proxy to the handler.
   */
  let body = "";

  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", async () => {
    const json = JSON.parse(body);

    if (json.format === getJSONFormatHeader({ name: "event_proxy" })) {
      await handler(json.event, {} as any);
    }
  });
};

http
  .createServer(async (request, response) => {
    await proxyEventToLambdaHandler(request);

    response.writeHead(200, { "Content-Type": "application/json" });
    response.write("OK");
    response.end();
  })
  .on("error", (error) => {
    logger.error("Proxy error.", { error });
  })
  .on("clientError", (error) => {
    logger.error("Proxy client error.", { error });
  })
  .on("listening", () =>
    logger.info(`Proxy is listening on port ${CONFIG.PROXY_PORT}.`)
  )
  .listen({ port: CONFIG.PROXY_PORT, host: "0.0.0.0" });
