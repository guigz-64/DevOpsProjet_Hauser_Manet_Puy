const assert = require('assert');
var expect = require('chai').expect;
 
const mongoose = require("mongoose");
require("../src/models/clientModel");
const Client = mongoose.model("Client");

 
describe('User', () => {


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
  
//       it('passing wrong user parameters', (done) => {
//         const user = {
//           fullname: '',
//           email : '',
//           phone : ''
//         }
//         var client = new Client(user, (err, result) => {
//           expect(err).to.not.be.equal(null)
//           expect(result).to.be.equal(null)
//           done()
//         })
//       })
     } )}
)