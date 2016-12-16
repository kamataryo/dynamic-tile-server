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
  const unit = opt && opt.tms ? -1 : 1
  const n = PI - 2 * PI * y / getTileNum(z)
  return unit * 180 / PI * Math.atan(
    (Math.exp(n) - Math.exp(-n)) / 2
  )
}

export const iterateSplitTile = ({z, x, y, res_h, res_w, tms}, lamda) => {

  const {top, right, bottom, left} = {
    top: tile2lat(y, z, {tms}),
    right: tile2lon(x + 1, z),
    bottom: tile2lat(y + 1, z, {tms}),
    left: tile2lon(x, z)
  }
  const width = right - left
  const height = top - bottom
  const w_unit = width / res_w
  const h_unit = height / res_h

  for (var h = bottom + h_unit / 2; h < top; h += h_unit) {
    for (var w = left + w_unit / 2; w < right; w += w_unit) {
      lamda(h, w)
    }
  }
}
