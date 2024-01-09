export type PaginationResponse<T> = {
	contents: T[];
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	totalCount: number;
	isLastPage: boolean;
	isFirstPage: boolean;
};
