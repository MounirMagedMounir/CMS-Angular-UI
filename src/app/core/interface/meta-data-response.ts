export interface MetaDataResponse<T> {
    
    filters: T;
    sortBy: string;
    sortOrder: string;
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
}
