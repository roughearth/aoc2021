export type MapValueOf<A> = A extends Map<any, infer V> ? V : never;
