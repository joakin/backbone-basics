;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function(){
var Basics = require('./index')

if (!window.Basics) {
  window.Basics = Basics
} else {
  throw new Error('Basics global variable already defined')
}

})()
},{"./index":2}],2:[function(require,module,exports){

var Basics        = {}
Basics.Model      = require('./model')
Basics.Collection = require('./collection')
Basics.View       = require('./view')
Basics.Fn         = require('./fn')
module.exports    = Basics

console.log('loaded!')


},{"./model":3,"./collection":4,"./view":5,"./fn":6}],3:[function(require,module,exports){

var mixin    = require('./fn').mixin
  , _        = require('underscore')
  , Backbone = require('backbone')

/*
 * Base model for the application.
 */


// Provides helper for nested models.
// By setting the property `types` on a model, you can specify which keys
// correspond to complex types, let that be Models, Collections or custom
// types. When parsed from json they will be instantiated with `new`, and
// when asked toJSON they will be parsed by calling a `toJSON` method that
// they have to implement.
module.exports = Backbone.Model.extend({

  // This function takes a json object and parses its attributes
  // instantiating the ones that are present on the this.types attribute with
  // the type specified there.
  // This function is used on the default this.parse, but exposed just in
  // case you need to override parse and/or call it explicitly from
  // somewhere.
  // It also considers an option called unfold, to specify that it should
  // always create the submodels even if the value in the json is empty.
  _parseTypes: function(json, options) {
    if (this.types) _.each(this.types, function(Type, key) {
      if ((options.unfold || json[key]) && !(json[key] instanceof Type))
        json[key] = new Type(json[key], options)
    })
    return json
  },

  // Change the default parse function to parse types as well
  parse: function(json, options) {
    return this._parseTypes(json, options)
  },

  // This function takes an attributes object and converts its attributes
  // that are complex types into JSON by calling a `toJSON` attribute on the
  // object (must be implemented, otherwise fail loudly to be noted).
  // This function is used on the default this.toJSON, but exposed just in
  // case you need to override toJSON and/or call it explicitly from
  // somewhere.
  _typesToJSON: function(attrs) {
    if (this.types) _.each(this.types, function(Type, key) {
      attrs[key] = attrs[key] && attrs[key].toJSON()
    })
    return attrs
  },

  // Override the default toJSON object so that it converts typed attrs to js
  // objects.
  toJSON: function() {
    var attrs = _.clone(this.attributes)
    return this._typesToJSON(attrs)
  }

}, {
  mixin: _.partial(mixin, this)
})


},{"underscore":7,"backbone":8,"./fn":6}],4:[function(require,module,exports){

var mixin    = require('./fn').mixin
  , _        = require('underscore')
  , Backbone = require('backbone')

/*
 * Base Collection
 */

module.exports = Backbone.Collection.extend({}, {
  mixin: _.partial(mixin, this)
})

},{"underscore":7,"backbone":8,"./fn":6}],6:[function(require,module,exports){

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

},{"underscore":7}],5:[function(require,module,exports){

var mixin    = require('./fn').mixin
  , _        = require('underscore')
  , Backbone = require('backbone')

/*
 * Base View
 */

module.exports = Backbone.View.extend({}, {
  mixin: _.partial(mixin, this)
})

},{"underscore":7,"backbone":8,"./fn":6}],7:[function(require,module,exports){

module.exports = window._


},{}],8:[function(require,module,exports){

module.exports = window.Backbone


},{}]},{},[1])
;