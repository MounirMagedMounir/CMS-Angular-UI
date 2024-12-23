export interface ApiResponse <T>{
    status: number;
    message: Array<string>;
    data: T;
}
