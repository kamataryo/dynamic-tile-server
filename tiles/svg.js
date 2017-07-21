import { getInnerPoints } from '../lib/tileConvert'

export const createSVG = ({ z, x, y, resolution }) => {

  const colors = [
    '#1ca69e',
    '#188fc2',
    '#bb625e',
    '#09740a',
  ]

  return `<svg
    height="100"
    width="100"
    viewbox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg">
    <rect
      x="0"
      y="0"
      width="100"
      height="100"
      fill="none"
      stroke="#666666"
      stroke-width="2px" />` +
    getInnerPoints({ z, x, y, resolution, tms: true }).map(point => {
      return `<rect
        x="${point.bbox.left_p}"
        y="${point.bbox.top_p}"
        width="${point.bbox.width_p}"
        height="${point.bbox.width_p}"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="1px" />
        <circle
          cx="${point.center.lon_p}"
          cy="${point.center.lat_p}"
          r="${point.bbox.width_p / 2}"
          fill="${colors[Math.round(Math.random() * colors.length)]}">
        <animate
          attributeName="r"
          begin="0s"
          dur="2s"
          from="0"
          to="3"
          repeatCount="indefinite" />
        </circle>`
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
  res.write(createSVG({
    z, x, y,
    resolution: { width: 10, height: 10 }
  }))
  res.end()

}
