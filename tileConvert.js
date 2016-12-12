const tile2lon = (x, z) => x / Math.pow(2, z) * 360 - 180
const tile2lat = (y, z) => {
  const n = Math.PI - 2 * Math.PI * y / Math.pow(2, z)
  return 180 / Math.PI * Math.atan(
    .5 * (Math.exp(n) - Math.exp(-n))
  )
}

export { tile2lon, tile2lat }
