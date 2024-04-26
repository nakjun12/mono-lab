import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "./query";

export function usePhotos(): UseQueryResult {
	return useQuery(queryOptions.all());
}

export function usePhoto({ photoId }: { photoId: number }): UseQueryResult {
	return useQuery(queryOptions.detail(photoId));
}

export function useComments({ photoId }: { photoId: number }): UseQueryResult {
	return useQuery(queryOptions.comments(photoId));
}

export function useComment({
	photoId,
	commentId,
}: {
	photoId: number;
	commentId: number;
}): UseQueryResult {
	return useQuery(queryOptions.comment({ photoId, commentId }));
}
