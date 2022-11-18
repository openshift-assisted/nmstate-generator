import { isPlainObject } from 'lodash';
import camelCase from 'lodash/camelCase';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapKeys';

export const camelKeys = (value: any): any => {
  if (Array.isArray(value)) {
    return mapValues(value, camelKeys);
  }
  if (isPlainObject(value)) {
    const camelCasedObject = mapKeys(value, function (value, key) {
      return camelCase(key);
    });
    return mapValues(camelCasedObject, camelKeys);
  } else {
    return value;
  }
};
