export interface IApiService<T> {
    baseUrl: string;
    getAsync(uri: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<T>;
    postAsync(uri: string, body: unknown, headers?: Record<string, string>): Promise<T>;
    putAsync(uri: string, body: unknown, headers?: Record<string, string>): Promise<T>;
    deleteAsync(uri: string, headers?: Record<string, string>): Promise<T>;
}
