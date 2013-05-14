
var Basics = require('./index')

if (!window.Basics) {
  window.Basics = Basics
} else {
  throw new Error('Basics global variable already defined')
}
