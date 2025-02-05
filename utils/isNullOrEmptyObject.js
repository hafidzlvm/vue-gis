export function isNullOrEmptyObject(value) {
  return value === null || (typeof value === 'object' && Object.keys(value).length === 0)
}
