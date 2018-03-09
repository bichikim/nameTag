import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray'
import isNil from 'lodash/isNil'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import split from 'lodash/split'
import startsWith from 'lodash/startsWith'
import trimStart from 'lodash/trimStart'
import {
  IKeys,
  IKeysInfo,
  IMapInfinityOptions,
  IMapInfoPayload,
  IStringMapOption,
} from './types'
const TIL_INFINITY = -1
export const stringMap = (
  keyName: string,
  keyInfo: IKeysInfo = {},
  options: IStringMapOption = {},
): string => {
  const {startKey = '$', separator = '/'} = options
  const _keyName = keyName
  if(startsWith(_keyName, startKey)){
    const name = trimStart(_keyName, startKey)
    const paths = split(name, separator)
    let currentKey: IKeysInfo | string = keyInfo
    forEach(paths, (path) => {
      currentKey = currentKey[path]
      if(isNil(currentKey)){
        return false
      }
    })
    if(isString(currentKey)){
      return currentKey
    }
    return name
  }
  return keyName
}

export const mapAll = (
  keys: IKeys,
  mapInfo: IMapInfoPayload,
  options: IStringMapOption = {},
): IKeys => {
  const resultKeys: IKeys = {}
  const {keyInfo = {}, valueInfo = {}} = mapInfo
  forEach(keys, (item: string, key: string) => {
    resultKeys[stringMap(key, keyInfo, options)] = stringMap(item, valueInfo, options)
  })
  return resultKeys
}

export const mapInfinity = (
  keys: IKeys,
  mapInfo: IMapInfoPayload,
  options: IMapInfinityOptions = {},
): IKeys => {
  const resultKeys: IKeys = {}
  const {til = TIL_INFINITY} = options
  forEach(keys, (value, key) => {
    const {keyInfo = {}, valueInfo = {}} = mapInfo
    const mappedKey = stringMap(key, keyInfo, options)
    let myItem = value
    if((isObject(value) || isArray(value)) && til !== 0){
      myItem = mapInfinity(myItem as IKeys, mapInfo, {...options, til: til - 1})
    }else if(isString(value)){
      myItem = stringMap(value, valueInfo, options)
    }
    resultKeys[mappedKey] = myItem
  })
  return resultKeys
}
