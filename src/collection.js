
var mixin    = require('./fn').mixin
  , _        = require('underscore')
  , Backbone = require('backbone')

/*
 * Base Collection
 */

module.exports = Backbone.Collection.extend({}, {
  mixin: _.partial(mixin, this)
})
