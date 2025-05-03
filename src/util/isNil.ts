export function isNil(
  value: undefined | null | unknown,
): value is undefined | null {
  return value === undefined || value === null;
}
