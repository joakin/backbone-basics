
var mixin    = require('./fn').mixin
  , _        = require('underscore')
  , Backbone = require('backbone')

/*
 * Base View
 */

module.exports = Backbone.View.extend({}, {
  mixin: _.partial(mixin, this)
})
