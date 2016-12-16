import { getInnerPoints } from '../lib/tileConvert'

export const createSVG = ({ z, x, y, resolution }) => {

  const colors = [
    '#1ca69e',
    '#188fc2',
    '#bb625e',
    '#09740a',
  ]

  return '<svg height="100" width="100" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">' +
    getInnerPoints({ z, x, y, resolution, tms: true }).map(point => {
      return `<circle
           cx="${point.center.lon_p}"
           cy="${point.center.lat_p}"
            r="${point.bbox.width_p / 2}"
         fill="${colors[Math.round(Math.ranodom() * colors.length)]}" />`
    }) +
    '</svg>'
}

export const route = (req, res) => {

  let {z, x, y} = req.params

  // parse z x y and extension
  z = Number(z)
  x = Number(x)
  const matchY = y.match(/([1-9][0-9]*)\.([a-zA-Z]*)/)
  y =   matchY ? Number(matchY[1]) : false
  const ext = matchY ? matchY[2].toUpperCase() : false

  res.set('Content-Type', ' image/svg+xml')

  // res.write(createSVGText({
  //   width: 256,
  //   height: 256,
  //   z, x, y
  // }))
  res.write(createSVG({
    z, x, y,
    resolution: { width: 4, height: 4 }
  }))
  res.end()

}
