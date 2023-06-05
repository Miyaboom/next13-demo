declare type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface Window {
  dataLayer: Record<string, unknown>[];
}
