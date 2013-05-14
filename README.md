
## Backbone Basics

Basics library for developing backbone applications.

**This is a work in progress**

## Contents

Basics exports this structures:

```javascript
Basics.Model
Basics.Collection
Basics.View
```

This is what this library provides to help:

### Nested data structures

To define nested structures:

```javascript
var Person = Basics.Model.Extend({
  defaults: {
    name: '',
    email: ''
  }
})

var Message = Basics.Model.extend({
  defaults: {
    subject: '',
    text: '',
    sender: null
  },
  types: {
    sender: Person
  }
})

var Messages = Basics.Collection.extend({
  model: Message
})

var Inbox = Basics.Model.extend({
  defaults: {
    owner: null,
    messages: null
  },
  types: {
    owner: Person,
    messages: Messages
  }
})
```

When creating them (works both passing json to the constructor and calling the
service with `.fetch`):

```javascript

// To create it with new from a JS structure or JSON, do not forget to pass the
// option `parse: true` at the end, or the subtypes wont be parsed
var inbox = new Inbox({
  owner: {
    name: 'John',
    email: 'john@example.com'
  },
  messages: [{
    subject: 'Example 1',
    text: 'Text 1',
    sender: {
      name: 'John',
      email: 'john@example.com'
    }
  }, {
    subject: 'Example 2',
    text: 'Text 2',
    sender: {
      name: 'John',
      email: 'john@example.com'
    }
  }]
}, {
  parse: true
})

var ownerName = inbox.get('owner').get('name')
  , secondMessageSubject = inbox.get('messages').at(1).get('subject')

expect(ownerName).to.eql('John')
expect(secondMessageSubject).to.eql('Example 2')
```

If you try to create a full empty object to bind it to forms/views, then the
way above wont work. You need the special option `unfold: true` like this:

```javascript

// Previous behaviour, parse subtypes but conform the defaults (do not expand
// empty properties to its subtypes
var inbox1 = new Inbox(null, { parse: true })

expect(inbox1.get('owner')).to.be.a('null')
expect(inbox1.get('messages')).to.be.a('null')

// If we want the subtypes to be parsed and unfolded
var inbox2 = new Inbox(null, { parse: true, unfold: true })

var owner = inbox2.get('owner')
  , messages = inbox2.get('messages')

expect(owner).to.be.an.instanceof(Person)
expect(owner.get('name')).to.eql('')
expect(messages).to.be.an.instanceof(Messages)
expect(messages.length).to.eql(0)
```

### Mixin objects

Backbone provides for its types the `extend` method to create class
hierarchies.

This is very convenient, but very convenient also is taking advantage of
javascript and using mixins to extract functionality that is independent and
common through classes but does not relate to them in a hierarchical way.

All types from basics have a `mixin` method that allows them to mixin with JS
objects that contain variables/functions that encapsulate functionality. The
mixin method is added to the types, not the instances.

You can use it like this:

```javascript
/*
 * Mixin asOneTimeModal
 *
 * Makes a view behave as a one time modal when calling a `show` method.
 *
 * Mixes a `show` method, when the modal is closed the view will be
 * automatically removed.
 *
 * Mixes a `hide` method, that will hide the modal and remove the view
 * afterwards
 *
 * It also mixes a template for the modal as `modalTemplate`
 */
var asOneTimeModal = {
  modalTemplate: _.template(modalTemplateSource),
  events: {
    'click .modal-header .close'    : 'hide',
    'click .modal-footer .btn-close': 'hide'
  },
  show: function() {
    var $m = this.$('.modal').modal({})
    $m.on('hidden', _.bind(this.remove, this))
  },
  hide: function() {
    this.$('.modal').modal('hide')
    this.trigger('close:modal')
  }
}

/*
 * Sample View AddPerson
 *
 * This would be a add person view with a form, and we want it to act as
 * a modal using our mixin
 */
var AddPersonView = Basics.View.extend({
  events: {
    'click .submitModal': 'addPersonClick'
  },
  initialize: function(options) {
    // [...] Here goes code
  },
  // [...] Here go methods and event handlers
  addPersonClick: function(event) {
    // [...]
  }
}).mixin(asOneTimeModal)

var newGuy = new Person()
var addPersonForm = new AddPersonView({ model: newGuy })

// Now the add person form behaves as a modal, and that functionality can be
// reused in any type even if they are not connected
addPersonForm.show() // > Shows the modal on the page
```

The same ideas can be applied to models and collections. For example to create
Pageable collections, lazy loading models, etc. There may be some basic mixins
included in Basics in the future to be mixed with the basics types.

## Usage

Still in development, at the moment is only in requireable files, there is not
a compiled version on a unified file.

## Development

To get the dependencies do a `npm install`

Source is on the `src` folder.

Tests on the `test` folder.

Make actions:
* Compile: `make compile`
* Test: `make test`
* Tests watcher: `make test-w`

## TODO

At the root of the source there is a TODO file.

