const assert = require('assert');
const {expect} = require('chai');
require("../src/models/clientModel");
 
 
describe('User', () => {
  before(() => {
    mongoose = require("mongoose");
//require("../src/models/clientModel");
  Client = mongoose.model("Client");  
})

    describe('Create', () => {
  
      it('create a new user', (done) => {
        const user = {
          fullname: 'Guillaume Puy', 
          email : 'guillaume@gmail.com',
          phone : '0602'
        }
        var client = new Client(user, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')
          done()
        })
      })
  
      it('passing wrong user parameters', (done) => {
        const user = {
          fullname: 'Guillaume',
          email : 'guillaume',
          phone : '0620'
        }
        var client = new Client(user, (err, result) => {
          expect(err).to.not.be.equal(null)
          expect(result).to.be.equal(null)
          done()
        })
      })
     } )}
)