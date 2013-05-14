
var expect = require('chai').expect
  , Basics = require('../src')

// Some setup types for the tests

  var Person = Basics.Model.extend({
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

  describe('Basics', function() {

    it('exports an object', function() {
      expect(Basics).to.be.an('object')
    })

    it('should create the hierarchical structure of types', function() {

      var inbox = new Inbox({
        owner: {
          name: 'John',
          email: 'john@example.com'
        },
        messages: [
          {
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
        }
        ]
      }, { parse: true })

      var ownerName = inbox.get('owner').get('name')
        , secondMessageSubject = inbox.get('messages').at(1).get('subject')

      expect(ownerName).to.eql('John')
      expect(secondMessageSubject).to.eql('Example 2')

    })

    it('should unfold the hierarchical structure even if values are empty', function() {

      var inbox1 = new Inbox(null, { parse: true })

      expect(inbox1.get('owner')).to.be.a('null')
      expect(inbox1.get('messages')).to.be.a('null')

      var inbox2 = new Inbox(null, { parse: true, unfold: true })

      var owner = inbox2.get('owner')
        , messages = inbox2.get('messages')

      expect(owner).to.be.an.instanceof(Person)
      expect(owner.get('name')).to.eql('')
      expect(messages).to.be.an.instanceof(Messages)
      expect(messages.length).to.eql(0)

    })

  })
