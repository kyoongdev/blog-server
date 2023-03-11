import { OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
export declare class ResponseWithIdRegister implements OnModuleInit {
    private readonly discoveryService;
    private readonly metadataScanner;
    private readonly reflector;
    constructor(discoveryService: DiscoveryService, metadataScanner: MetadataScanner, reflector: Reflector);
    onModuleInit(): void;
}
