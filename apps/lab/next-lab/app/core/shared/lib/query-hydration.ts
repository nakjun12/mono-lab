import type { QueryKey, QueryState } from "@tanstack/react-query";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import type { ComponentType } from "react";
import { cache } from "react";

import { isEqual } from "~/app/core/shared/lib/is-equal";

export const getQueryClient = cache(() => new QueryClient());

//infer을 쓴 이유는 동적 타입 반환을 위해서
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

interface QueryProps<ResponseType = unknown> {
	queryKey: QueryKey;
	queryFn: () => Promise<ResponseType>;
}

interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
	state: QueryState<TData, TError>;
}

export async function getDehydratedQuery<Q extends QueryProps>({
	queryKey,
	queryFn,
}: Q) {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({ queryKey, queryFn });

	const { queries } = dehydrate(queryClient);

	const [dehydratedQuery] = queries.filter((query) =>
		isEqual(query.queryKey, queryKey),
	);

	return dehydratedQuery as DehydratedQueryExtended<
		UnwrapPromise<ReturnType<Q["queryFn"]>>
	>;
}

export const Hydrate: ComponentType = HydrationBoundary;

export default {};
