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
const tile2lon = (x, z) => {
　　return x / getTileNum(z) * 360 - 180
}

/**
 * get tile Y coordinate value
 */
const tile2lat = (y, z) => {
  const n = PI - 2 * PI * y / getTileNum(z)
  return 180 / PI * Math.atan(
    (Math.exp(n) - Math.exp(-n)) / 2
  )
}

export { tile2lon, tile2lat }
