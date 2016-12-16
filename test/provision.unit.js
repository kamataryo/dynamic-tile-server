import assert from 'assert'
import { hotSpotCenters, isHotSpot } from '../lib/provision'


describe('test of hotspot container', () => {
  it('should generate some hot spots', () => {
    assert(hotSpotCenters.length > 10)
  })
})

describe('test of isHotSpot function', () => {
  it('should be a hotspot', () => {
    const newSpot = Object.assign({}, hotSpotCenters[0])
    newSpot.lat += newSpot.radius / 2
    newSpot.lon -= newSpot.radius / 2
    assert(isHotSpot(newSpot))
  })

  it('should not be a hotspot', () => {
    const newSpot = Object.assign({}, hotSpotCenters[0])
    newSpot.lat += newSpot.radius * 2
    newSpot.lon -= newSpot.radius * 2
    assert(!isHotSpot(newSpot))
  })
})
