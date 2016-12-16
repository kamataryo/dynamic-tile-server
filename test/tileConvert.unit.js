import assert from 'assert'
import { assertFloatEqual } from './helper'
import { tile2lat, tile2lon, iterateSplitTile } from '../lib/tileConvert'

// z=16
// x=58213
// y=39716
// left = 139.773559570
// top = 35.6215818995
//
// z=16
// x=58212
// y=39715
// left=139.768066406
// top=35.6171164838

describe('tile to latlng convert', () => {
  it('should be converted to latitude', () => {
    assertFloatEqual(
      tile2lat(39716, 16, { tms: true }),
      35.6215818995,
      7
    )
  })
  it('should be converted to latitude, non tms', () => {
    assertFloatEqual(
      tile2lat(39716, 16, { tms: false }),
      -35.6215818995,
      7
    )
  })
  it('should be converted to longitude', () => {
    assertFloatEqual(
      tile2lon(58212, 16),
      139.768066406,
      7
    )
  })
})

describe('tile innerpoint iterator', () => {

  it('should iterate inner split point of a tile', () => {
    let count = 0
    iterateSplitTile(
      {z: 16, x: 58212, y: 39715, res_h: 2, res_w: 2 },
      () => { count++ }
    )
    assert(count == 4)
  })

  it('should iterate inner split point of a tile', () => {
    const {top, right, bottom, left} = {
      top: tile2lat(39715, 16),
      right: tile2lon(58212 + 1, 16),
      bottom: tile2lat(39715 + 1, 16),
      left: tile2lon(58212, 16)
    }
    let prev_x = -200, prev_y = -200
    iterateSplitTile(
      {z: 16, x: 58212, y: 39715, res_h: 2, res_w: 2 , tms: true},
      (y, x) => {
        assert(left < x)
        assert(prev_x < x)
        assert(right > x)
        assert(bottom < y)
        assert(prev_y < y)
        assert(top > y)
        prev_x = x
        prev_y = y
      }
    )
  })

})
