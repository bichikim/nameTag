export interface IKeysInfo {
  [name: string]: string | IKeysInfo
}

export interface IStringMapOption {
  startKey?: string
  separator?: string
}

export interface IMapInfinityOptions extends IStringMapOption{
  til?: number
}

export interface IMapInfoPayload {
  keyInfo?: IKeysInfo
  valueInfo?: IKeysInfo
}

export interface IKeys {
  [name: string]: string | IKeys
}
