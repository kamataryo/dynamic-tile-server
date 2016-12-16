/**
 * get tile amount from zoom value
 */
const getTileNum = (z) => {
  return Math.pow(2, z)
}

/**
 * PI short name
 */
const PI = Math.PI

/**
 * get tile X coordinate value
 */
export const tile2lon = (x, z) => {
  return x / getTileNum(z) * 360 - 180
}

/**
 * get tile Y coordinate value
 */
export const tile2lat = (y, z, opt) => {
  const u = opt && opt.tms ? -1 : 1
  const n = PI - 2 * PI * y / getTileNum(z)
  return u * 180 / PI * Math.atan(
    (Math.exp(n) - Math.exp(-n)) / 2
  )
}

/**
 * [getInnerPoints description]
 * @param  {[type]}    z          [tile zoom]
 * @param  {[type]}    x          [tile x index]
 * @param  {[type]}    y          [tile y index]
 * @param  {[type]}    resolution [{ width, height } splitting resolution, number of points]
 * @param  {[type]}    tms        [interpret tile ID as TMS]
 * @return {Generator}            [description]
 * TODO: test of non TMS case, may need inverse
 */
export const getInnerPoints = ({ z, x, y, resolution, tms }) => {

  const { TOP, RIGHT, BOTTOM, LEFT } = {
    TOP: tile2lat(y, z, { tms }),
    RIGHT: tile2lon(x + 1, z),
    BOTTOM: tile2lat(y - 1, z, { tms }),
    LEFT: tile2lon(x, z)
  }
  const width = RIGHT - LEFT
  const height = TOP - BOTTOM
  // incremental width
  const w_unit = width / (resolution.width)
  // incremental height
  const h_unit = height / (resolution.height)

  const result = []

  for (var lat = BOTTOM; lat < TOP - h_unit / 2; lat += h_unit) {
    for (var lon = LEFT; lon < RIGHT - w_unit / 2; lon += w_unit) {
      result.push({
        bbox: {
          left: lon,
          top: lat,
          width: w_unit,
          height: h_unit,
          left_p: 100 * (lon - LEFT) / width,
          top_p: 100 * (lat - BOTTOM) / height,
          width_p: 100 / resolution.width,
          height_p: 100 / resolution.height
        },
        center: {
          lat: lat + h_unit / 2,
          lon: lon + w_unit / 2,
          lon_p: 100 * (lon - LEFT + w_unit / 2) / width,
          lat_p: 100 * (lat - BOTTOM + h_unit / 2) / height
        }
      })
    }
  }
  return result
}
