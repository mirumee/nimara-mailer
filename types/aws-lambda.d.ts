import "aws-lambda";

declare module "aws-lambda" {
  /**
   * `aws-lambda` has wrong types. Every key should be staring in capital letters.
   * Beware, lowercase properties are still available, due to TS interface merging!
   * Please do not use them!
   * https://github.com/aws/aws-lambda-go/issues/368
   */
  export interface SQSRecord {
    MessageId: string;
    ReceiptHandle: string;
    Body: string;
    Attributes: SQSRecordAttributes;
    MessageAttributes: SQSMessageAttributes;
    Md5OfBody: string;
    Md5OfMessageAttributes?: string;
    EventSource: string;
    EventSourceARN: string;
    AwsRegion: string;
  }
}
