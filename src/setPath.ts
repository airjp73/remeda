import { F } from 'ts-toolbelt';
import { purry } from './purry';
import { Path, SupportsValueAtPath, ValueAtPath } from './_paths';
import { Key } from './_types';

export function setPath<T, TPath extends Key[] & Path<T>>(
  object: T,
  path: F.Narrow<TPath>,
  value: ValueAtPath<T, TPath>
): T;

export function setPath<TPath extends Key[], Value>(
  path: F.Narrow<TPath>,
  value: Value
): <Obj>(object: SupportsValueAtPath<Obj, TPath, Value>) => Obj;

export function setPath() {
  return purry(_setPath, arguments);
}

export function _setPath(object: any, path: any[], defaultValue: any): any {
  if (path.length === 0) return defaultValue;

  if (Array.isArray(object)) {
    return object.map((item, index) => {
      if (index === path[0]) {
        return _setPath(item, path.slice(1), defaultValue);
      }
      return item;
    });
  }

  return {
    ...object,
    [path[0]]: _setPath(object[path[0]], path.slice(1), defaultValue),
  };
}
