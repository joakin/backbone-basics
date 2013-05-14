
var _ = require('underscore')

var fn = {}

fn.mixin = function(destiny, withMixin) {
  for (var key in withMixin) {
    if (withMixin.hasOwnProperty(key)) {
      var prop = withMixin[key]
      if (_.isObject(prop)) {
        prop = fn.mixin(_.isArray(prop)? []: {}, prop)
      }
      destiny[key] = prop
    }
  }
  return destiny
}
