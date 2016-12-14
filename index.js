import express from 'express'
import { PNG } from 'pngjs'
import { tile2lat, tile2lon } from './tileConvert'
import * as d3 from 'd3'
import { jsdom } from 'jsdom'


// sample 100 points
const hotSpotCenters = Array.from(Array(100).keys()).map(() => {
  return {
    lat: Math.random() * 180 - 90,
    lon: Math.random() * 360 - 180,
    radius: Math.random() * .5
  }
})

// judge if a point is hotspot
const isHotSpot = (spot) => {
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


const createSVGText = opt => {

  const colors = ['AliceBlue', 'HoneyDew', 'MistyRose', 'Tan']
  const getColor = () => colors[Math.floor(Math.random() * colors.length)]

  return `
  <svg width="256" height="256" viewBox="0 0 256 256"  xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="50" fill="${getColor()}" />
    <circle cx="64" cy="192" r="50" fill="${getColor()}" />
    <circle cx="192" cy="64" r="50" fill="${getColor()}" />
    <circle cx="192" cy="192" r="50" fill="${getColor()}" />
  </svg>
  `
}

/**
 * wrapper of PNGjs library
 */
const createReadablePNGTileImageStream = (opt, getRGBA) => {
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

const getDrawTileFunc = (tileX, tileY) => {
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

/**
 * start server
 */
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
    const self_x = x
    const self_y = y

    // res.set('Content-Type', 'image/png')
    // createReadablePNGTileImageStream({
    //   width: 256,
    //   height: 256,
    //   filterType: 4
    // }, getDrawTileFunc(self_x, self_y))
    //   .on('data', (chunk) => {
    //     res.write(chunk)
    //   })
    //   .on('end', () => {
    //     res.end()
    //   })

    res.set('Content-Type', ' image/svg+xml')

    res.write(createSVGText({
      width: 256,
      height: 256
    }))
    res.end()

  })
  .listen(3000)
