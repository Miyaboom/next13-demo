declare type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
