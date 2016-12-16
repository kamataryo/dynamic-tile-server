import assert from 'assert'
import { assertFloatEqual } from './helper'
import { tile2lat, tile2lon, getInnerPoints } from '../lib/tileConvert'

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

describe('tile to latlon convert', () => {
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

  it('should iterate inner split points of a tile', () => {
    const points = getInnerPoints({
      z: 16, x: 58212, y: 39715,
      resolution: {
        width: 2,
        height: 2
      },
      tms: true
    })
    assert(points.length === 4)
    assert(Math.round(points[0].center.lon_p) === 25)
    assert(Math.round(points[1].center.lon_p) === 75)
    assert(Math.round(points[2].center.lon_p) === 25)
    assert(Math.round(points[3].center.lon_p) === 75)
    assert(Math.round(points[0].center.lat_p) === 25)
    assert(Math.round(points[1].center.lat_p) === 25)
    assert(Math.round(points[2].center.lat_p) === 75)
    assert(Math.round(points[3].center.lat_p) === 75)
  })

})
