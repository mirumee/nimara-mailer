import "aws-lambda";

declare module "aws-lambda" {
  /**
   * `aws-lambda` has mismatched types based on usage.
   * 1. When using `awslocal` or pulling messages directly from SQS - keys are title cased.
   * 2. When used directly on AWS and SQS is triggering the lambda - keys are correct wit the aws-lambda types - lowercased.
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
