import type { Response as ResponseType } from 'express';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    default(response: ResponseType): void;
    healthCheck(response: ResponseType): void;
}
