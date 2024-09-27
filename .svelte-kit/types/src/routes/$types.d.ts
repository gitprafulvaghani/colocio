import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type LayoutRouteId = RouteId | "/(connected)" | "/(connected)/account" | "/(connected)/automated" | "/(connected)/chat" | "/(connected)/dashboard" | "/(connected)/insights" | "/(connected)/payment/payment" | "/(connected)/payment/process" | "/(connected)/post" | "/(connected)/promo" | "/(connected)/promotions" | "/(connected)/sandbox" | "/(connected)/schedule" | "/(connected)/settings" | "/(connected)/settings/accounts" | "/(connected)/settings/audience-profiles" | "/(connected)/settings/billing" | "/(connected)/settings/business-info/custom" | "/(connected)/settings/business-info/from-account" | "/(connected)/settings/users" | "/(connected)/sharepost" | "/(non-dashboard)/onboarding" | "/(not-connected)/login" | "/(not-connected)/logout" | "/(not-connected)/reset-password" | "/(not-connected)/signup" | "/auth/auth-code-error" | "/createpost" | null
type LayoutParams = RouteParams & {  }
type LayoutParentData = EnsureDefined<{}>;

export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;