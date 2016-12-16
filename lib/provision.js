// sample 100 points
export const hotSpotCenters = Array.from(Array(100).keys()).map(() => {
  return {
    lat: Math.random() * 180 - 90,
    lon: Math.random() * 360 - 180,
    radius: Math.random() * .5
  }
})

// judge if a point is hotspot
export const isHotSpot = (spot) => {
  for (var i = 0; i < hotSpotCenters.length; i++) {
    let center = hotSpotCenters[i]
    let diff = Math.sqrt(
      Math.pow(center.lat - spot.lat, 2) +
      Math.pow(center.lon - spot.lon, 2)
    )
    if (diff < center.radius) {
      return true
    }
  }
  return false
}
