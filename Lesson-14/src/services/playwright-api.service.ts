import { APIRequestContext, APIResponse, request } from 'playwright';
import { IApiService } from './i-api.service';

export class PlaywrightApiService implements IApiService<APIResponse> {
    private apiRequestContext?: APIRequestContext;

    public constructor(public readonly baseUrl: string) {}

    public async getAsync(
        uri: string,
        params?: Record<string, string | number | boolean>,
        headers?: Record<string, string>
    ): Promise<APIResponse> {
        const requestContext = await this.getRequestContext();
        return requestContext.get(uri, { headers, params });
    }

    public async postAsync(uri: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse> {
        const requestContext = await this.getRequestContext();
        return requestContext.post(uri, { headers, data: body });
    }

    public async putAsync(uri: string, body: unknown, headers?: Record<string, string>): Promise<APIResponse> {
        const requestContext = await this.getRequestContext();
        return requestContext.put(uri, { headers, data: body });
    }

    public async deleteAsync(uri: string, headers?: Record<string, string>): Promise<APIResponse> {
        const requestContext = await this.getRequestContext();
        return requestContext.delete(uri, { headers });
    }

    private async getRequestContext(): Promise<APIRequestContext> {
        if (!this.apiRequestContext) {
            this.apiRequestContext = await request.newContext({ baseURL: this.baseUrl });
        }
        return this.apiRequestContext;
    }
}
