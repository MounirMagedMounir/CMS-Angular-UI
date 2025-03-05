export interface MetaDataResponse<T> {
    
    filters: T;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
}
