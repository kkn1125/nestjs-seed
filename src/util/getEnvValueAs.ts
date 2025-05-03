import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { isNil } from './isNil';

const RUN_MODE = process.env.NODE_ENV ?? 'production';

dotenv.config({
  path: path.join(path.resolve(), '.env'),
});
if (fs.existsSync(`.env.${RUN_MODE}`)) {
  dotenv.config({
    path: path.join(path.resolve(), `.env.${RUN_MODE}`),
    override: true,
  });
}

type ReturnValue<Type> = Type extends BooleanConstructor
  ? boolean
  : Type extends StringConstructor
    ? string
    : Type extends NumberConstructor
      ? number
      : never;

export function getEnvValueAs<
  Type extends BooleanConstructor | StringConstructor | NumberConstructor,
  Return extends ReturnValue<Type>,
>(type: Type, propertyName: string): Return {
  const envValue = process.env[propertyName];
  if (isNil(envValue)) {
    throw new Error(`not found env property.${propertyName}`);
  }
  switch (type) {
    case Boolean:
      return !!JSON.parse(envValue) as Return;
    case String:
      return envValue as Return;
    case Number:
      return parseInt(envValue) as Return;
    default:
      throw new Error(`not allowed type.${type}`);
  }
}
