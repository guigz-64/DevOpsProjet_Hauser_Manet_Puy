const expect  = require('chai').expect;
const request = require('supertest');
//router= require('./clientController');
//const connect = require('./create');

describe('Post /',() => {
    before(async (done) => {
        router= require('./clientController');
         connect = require('./create');
        await connect.connect()
        .then(() => done())
        .catch((err) => done(err));
    })

    after((done) => {
        connect.close()
        .then(() => done())
        .catch((err) => done(err))
    })

    it('Creating a new note works', (done) =>{
        request(router).post('/')
        .send({fullName:'Guillaume Puy', email:'gui@free.fr', mobile:'0612346523'})
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('fullName');
            expect(body).to.contain.property('email');
            expect(body).to.contain.property('mobile');
            done();
        })
        .catch((err) => done(err))
    })



})