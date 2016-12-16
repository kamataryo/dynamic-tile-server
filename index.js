import express from 'express'
import { route as svgRoute } from './tile/svg'
import { route as pngRoute } from './tile/png'

/**
 * start server
 */
// TODO: How to use regex for express route?
express()
  .get('/:z/:x/:y', svgRoute)
  // .get('/:z/:x/:y.png', pngRoute)
  .listen(3000)
