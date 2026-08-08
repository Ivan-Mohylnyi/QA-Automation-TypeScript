import { ConfigDto } from '../models';

export class ConfigService {
    public getConfig(): ConfigDto {
        return {
            baseUrl: process.env.JOKE_API_BASE_URL || 'http://localhost:3005'
        };
    }
}
