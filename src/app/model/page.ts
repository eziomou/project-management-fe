export interface Page<T> {
    data: T[];
    _metadata: PageMetadata;
}

export interface PageMetadata {
    totalCount: number;
}