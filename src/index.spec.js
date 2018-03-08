import {mapInfinity, mapAll} from './index'
describe('stringMap', () => {
  let keys
  let keyInfo
  let mappedKeys
  let valueInfo
  beforeEach(() => {
    keys = {
      '$app/name': 'app/name/data',
      '$api': 'api/data',
      '$kind/deep/fine': 'kind/deep/fine',
      '$array/1': 'array/second',
      'no-map': 'no-map',
      '$infinity': {
        'no-map-infinity': 'no-map-infinity',
        '$infinity-inside/name': 'infinity-inside',
        deep: {
          '$infinity-inside/deepName': '$infinity'
        }
      }
    }
    keyInfo = {
      infinity: 'mappedInfinity',
      'infinity-inside': {
        name: 'mappedInfinityName',
        deepName: 'mappedInfinityDeepName'
      },
      app: {
        name: 'mappedName'
      },
      api: 'mappedApi',
      kind: {
        deep: {
          fine: 'mappedFine'
        }
      },
      array: ['firstItem', 'secondItem', 'other1', 'other2']
    }
    valueInfo = {
      infinity: 'mappedInfinityValue'
    }
  })
  afterEach(() => {
    expect(mappedKeys).to.include({
      mappedName: 'app/name/data',
      mappedApi: 'api/data',
      mappedFine: 'kind/deep/fine',
      secondItem: 'array/second',
    })
  })
  describe('mapAll', () => {
    it('can replace key by mapInfo', () => {
      mappedKeys = mapAll(keys, {keyInfo, valueInfo})
    })
  })

  describe('mapInfinity', () => {
    afterEach(() => {
      expect(mappedKeys.mappedInfinity).to.be.an('object')
      expect(mappedKeys.mappedInfinity).to.include({
        'no-map-infinity': 'no-map-infinity',
        mappedInfinityName: 'infinity-inside',
      })
      expect(mappedKeys.mappedInfinity.deep).to.be.an('object')
    })
    it('can replace key by mapInfo', () => {
      mappedKeys = mapInfinity(keys, {keyInfo, valueInfo})
      expect(mappedKeys.mappedInfinity.deep).to.include({
        mappedInfinityDeepName: 'mappedInfinityValue',
      })
    })
    it('can replace key by mapInfo with til option', () => {
      mappedKeys = mapInfinity(keys, {keyInfo, valueInfo}, {til: 1})
      expect(mappedKeys.mappedInfinity.deep).to.include({
        '$infinity-inside/deepName': '$infinity',
      })
    })
  })

  // it('', () => {
  //   expect()
  // })
})
