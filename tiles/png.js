import { PNG } from 'pngjs'

/**
 * wrapper of PNGjs library
 */
export const createReadablePNGTileImageStream = (opt, getRGBA) => {
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

export const getDrawTileFunc = (tileX, tileY) => {
  return (x, y) => {
    if (x === 0 || y === 0 || x === 255 || y === 255) {
      return {
        Red: 200,
        Green: 200,
        Blue: 200,
        Alpha: 255
      }
    } else {
      if (tileY % 2 === 0) {
        if (tileX % 2 === 0) {
          return {
            Red:   x,
            Green: x,
            Blue: y,
            Alpha: 200
          }

        } else {
          return {
            Red:   x,
            Green: 255 - y,
            Blue: y,
            Alpha: 200
          }
        }
      } else {
        if (tileX % 2 === 2) {
          return {
            Red:   y,
            Green: x,
            Blue: y,
            Alpha: 200
          }
        }
        return {
          Red:   y,
          Green: 255 - x,
          Blue: x,
          Alpha: 200
        }
      }
    }
  }
}

export const route = (req, res) => {

  let {z, x, y} = req.params

  // parse z x y and extension
  z = Number(z)
  x = Number(x)
  const matchY = y.match(/([1-9][0-9]*)\.([a-zA-Z]*)/)
  y =   matchY ? Number(matchY[1]) : false
  const ext = matchY ? matchY[2].toUpperCase() : false


  res.set('Content-Type', 'image/png')
  createReadablePNGTileImageStream({
    width: 256,
    height: 256,
    filterType: 4
  }, getDrawTileFunc(x, y))
    .on('data', (chunk) => {
      res.write(chunk)
    })
    .on('end', () => {
      res.end()
    })

  res.end()
}
