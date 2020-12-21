const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

let client

describe('User REST API', () => {

  before(() => {
    client = require('../src/dbClient')
  })

  after(()=> {
    app.close()
    client.quit()
  })

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'lr',
        firstname: 'lucas',
        lastname: 'rietsch',
        email: 'l.r@yahoo.fr',
        phone: '1234567890'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })

    it('pass wrong parameters', (done) => {
      const user = {
         firstname: 'lucas',
         lastname: 'rietsch',
         email: 'l.r@yahoo.fr',
         phone: '1234567890'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })

  describe('DELETE /user', () => {

    it('delete a new user', (done) => {
      chai.request(app)
        .delete('/user/delete/lr')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          //chai.expect(res.body.status).to.equal('success')
          //chai.expect(res).to.be.json
          done()
        })
        .catch(done)
    })

    it('pass wrong parameters', (done) => {
      chai.request(app)
        .delete('/user/delete/wrong')
        .then((res) => {
          chai.expect(res).to.have.status(404)
          //chai.expect(res.body.status).to.equal('error')
          //chai.expect(res).to.be.json
          done()
        })
        .catch(done)
    })
  })

})
