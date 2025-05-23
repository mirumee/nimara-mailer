export type Maybe<T> = T | null | undefined;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type EventData<T extends { event: unknown }> = {
  data: NonNullable<T["event"]>;
};

export type CustomEventData<T extends object> = {
  data: NonNullable<T>;
};

export type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
