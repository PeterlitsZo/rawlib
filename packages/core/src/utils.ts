export interface GetSetter<T, This> {
  (value: T): This;
  (): T;
}