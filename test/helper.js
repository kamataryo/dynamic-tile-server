import assert from 'assert'

export const assertFloatEqual = (lv, rv, digit) => {
  const lvr = Math.round(lv * Math.pow(10, digit))
  const rvr = Math.round(rv * Math.pow(10, digit))
  assert(lvr === rvr)
}
