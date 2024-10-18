import { NonTransientError, TransientError } from "@/lib/errors/base";

export class EmailSendError extends TransientError {}

export class EventNotSupportedError extends NonTransientError {}

export class EmailRenderError extends NonTransientError {}

export class FormatNotSupportedError extends NonTransientError {}
