import express from 'express'
import { PNG } from 'pngjs'
import { tile2lat, tile2lon } from './tileConvert'

const createReadableTileImageStream = (opt, getRGBA) => {

  const png = new PNG(opt)

  for (var y = 0; y < png.height; y++) {
    for (var x = 0; x < png.width; x++) {
      const idx = (png.width * y + x) << 2
      const { Red, Green, Blue, Alpha } = getRGBA(x, y)
      png.data[idx + 0] = Red
      png.data[idx + 1] = Green
      png.data[idx + 2] = Blue
      png.data[idx + 3] = Alpha
    }
  }
  return png.pack()
}

express()
  .get('/:z/:x/:y', (req, res) => {

    let {z, x, y} = req.params

    // parse z x y and extension
    z = Number(z)
    x = Number(x)
    const matchY = y.match(/([1-9][0-9]*)\.([a-zA-Z]*)/)
    y =   matchY ? Number(matchY[1]) : false
    const ext = matchY ? matchY[2].toUpperCase() : false

    // validate them
    // z = z && (0 <= z && z <= 19) ? Math.round(z) : false
    // x = x && (0 <= x && x <= Math.pow(2, z) - 1) ? Math.round(x) : false
    // y = y && (0 <= y && y <= Math.pow(2, z) - 1) ? Math.round(y) : false
    // ext = ['JPG', 'PNG', 'SVG', 'GEOJSON'].indexOf(ext) >=0 ? ext : false

    const {top, right, bottom, left} = {
      top: tile2lat(y, z),
      right: tile2lon(x + 1, z),
      bottom: tile2lat(y + 1, z),
      left: tile2lon(x, z)
    }

    res.set('Content-Type', 'image/png')

    createReadableTileImageStream({
      width: 256,
      height: 256,
      filterType: 4
    }, (x, y) => {
      const r = Math.random() * 255
      const g = Math.random() * 255
      const b = Math.random() * 255
      const a = Math.random() * 255
      return {
        Red:   r,
        Green: g,
        Blue: b,
        Alpha: a
      }
    })
      .on('data', (chunk) => {
        res.write(chunk)
      })
      .on('end', () => {
        res.end()
      })
  })
  .listen(3000)
