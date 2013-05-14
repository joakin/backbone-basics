!function(n,e,r){function i(r,t){if(!e[r]){if(!n[r]){var c=typeof require=="function"&&require;if(!t&&c)return c(r,!0);if(o)return o(r,!0);throw new Error("Cannot find module '"+r+"'")}var s=e[r]={exports:{}};n[r][0].call(s.exports,function(e){var o=n[r][1][e];return i(o?o:e)},s,s.exports)}return e[r].exports}var o=typeof require=="function"&&require;for(var t=0;t<r.length;t++)i(r[t]);return i}({1:[function(n,e,r){!function(){var e=n("./index");if(!window.Basics){window.Basics=e}else{throw new Error("Basics global variable already defined")}}()},{"./index":2}],2:[function(n,e,r){var i={};i.Model=n("./model");i.Collection=n("./collection");i.View=n("./view");i.Fn=n("./fn");e.exports=i;console.log("loaded!")},{"./model":3,"./collection":4,"./view":5,"./fn":6}],3:[function(n,e,r){var i=n("./fn").mixin,o=n("underscore"),t=n("backbone");/*
 * Base model for the application.
 */
// Provides helper for nested models.
// By setting the property `types` on a model, you can specify which keys
// correspond to complex types, let that be Models, Collections or custom
// types. When parsed from json they will be instantiated with `new`, and
// when asked toJSON they will be parsed by calling a `toJSON` method that
// they have to implement.
e.exports=t.Model.extend({// This function takes a json object and parses its attributes
// instantiating the ones that are present on the this.types attribute with
// the type specified there.
// This function is used on the default this.parse, but exposed just in
// case you need to override parse and/or call it explicitly from
// somewhere.
// It also considers an option called unfold, to specify that it should
// always create the submodels even if the value in the json is empty.
_parseTypes:function(n,e){if(this.types)o.each(this.types,function(r,i){if((e.unfold||n[i])&&!(n[i]instanceof r))n[i]=new r(n[i],e)});return n},// Change the default parse function to parse types as well
parse:function(n,e){return this._parseTypes(n,e)},// This function takes an attributes object and converts its attributes
// that are complex types into JSON by calling a `toJSON` attribute on the
// object (must be implemented, otherwise fail loudly to be noted).
// This function is used on the default this.toJSON, but exposed just in
// case you need to override toJSON and/or call it explicitly from
// somewhere.
_typesToJSON:function(n){if(this.types)o.each(this.types,function(e,r){n[r]=n[r]&&n[r].toJSON()});return n},// Override the default toJSON object so that it converts typed attrs to js
// objects.
toJSON:function(){var n=o.clone(this.attributes);return this._typesToJSON(n)}},{mixin:o.partial(i,this)})},{underscore:7,backbone:8,"./fn":6}],4:[function(n,e,r){var i=n("./fn").mixin,o=n("underscore"),t=n("backbone");/*
 * Base Collection
 */
e.exports=t.Collection.extend({},{mixin:o.partial(i,this)})},{underscore:7,backbone:8,"./fn":6}],6:[function(n,e,r){var i=n("underscore");var o={};o.mixin=function(n,e){for(var r in e){if(e.hasOwnProperty(r)){var t=e[r];if(i.isObject(t)){t=o.mixin(i.isArray(t)?[]:{},t)}n[r]=t}}return n}},{underscore:7}],5:[function(n,e,r){var i=n("./fn").mixin,o=n("underscore"),t=n("backbone");/*
 * Base View
 */
e.exports=t.View.extend({},{mixin:o.partial(i,this)})},{underscore:7,backbone:8,"./fn":6}],7:[function(n,e,r){e.exports=window._},{}],8:[function(n,e,r){e.exports=window.Backbone},{}]},{},[1]);