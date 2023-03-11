import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';

export const RESPONSE_WITH_ID = Symbol('RESPONSE_WITH_ID');
export const ReflectTarget = {
  Controller: 'Controller',
};

export function ResponseWithId(target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
  console.log({ target, key, descriptor });
  Reflect.defineMetadata(RESPONSE_WITH_ID, 'class', descriptor.value);
  return descriptor;
}

export function ResponseWithIdController(target: Object) {
  console.log({ target });
  // Reflect.defineMetadata(RESPONSE_WITH_ID, 'lcass', target);
}
