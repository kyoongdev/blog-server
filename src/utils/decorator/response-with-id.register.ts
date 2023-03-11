import { Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { ReflectTarget, RESPONSE_WITH_ID } from './response-with-id';

@Injectable()
export class ResponseWithIdRegister implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector
  ) {}

  onModuleInit() {
    this.discoveryService
      .getControllers()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      .forEach(({ instance, metatype }) => {
        this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), (methodKey) => {
          if (metatype) {
            const isResponseWithId = this.reflector.get(RESPONSE_WITH_ID, instance[methodKey]);
            methodKey === 'findUsers' && console.log({ isResponseWithId }, instance[methodKey], metatype);

            if (isResponseWithId) {
              // const originalMethod = instance[methodKey];
              // instance[methodKey] = async (...args) => {
              //   const result = await originalMethod.apply(instance, args);
              //   return result.map((item) => ({ id: item.id }));
              //
            }
          }
        });
      });
  }
}
