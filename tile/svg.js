export const createSVGText = opt => {

  const colors = [
    '#1ca69e',
    '#188fc2',
    '#bb625e',
    '#09740a',
  ]
  const colorChars = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
  const getColorChar = () => colorChars[Math.floor(Math.random() * colorChars.length)]
  const getColor = () => '#' + getColorChar() + getColorChar() + getColorChar()
  const getLength = () => Math.floor(Math.random() * 100)

  return `
  <svg height="100" width="100" viewbox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
    <circle cx="${getLength()}" cy="${getLength()}" r="${getLength() / 2}" fill="${getColor()}" />
  </svg>
  `
}

export const route = (req, res) => {

  let {z, x, y} = req.params

  // parse z x y and extension
  z = Number(z)
  x = Number(x)
  const matchY = y.match(/([1-9][0-9]*)\.([a-zA-Z]*)/)
  y =   matchY ? Number(matchY[1]) : false
  const ext = matchY ? matchY[2].toUpperCase() : false


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
    height: 256,
    z, x, y
  }))
  res.end()

}
