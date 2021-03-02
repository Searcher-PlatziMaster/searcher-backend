const proxyquire = require('proxyquire');
const jwt = require('jsonwebtoken');
const expect = require('chai').expect;

const { config } = require('../../../../src/config');
const { testServer } = require('../../../../src/utils/testServer');
const ControllerMock = require('../../../../src/utils/mocks/auth/controller');


describe('Test to POST /api/auth/sign-in', () => {
  const route = proxyquire('../../../../src/api/components/auth/network', {
    './controller': ControllerMock
  })
  const userMock = {
    email: 'name@undefined.com', 
    password: 'Password3'
  }

  it('Sign In-Basic Auth', (done) => {
    testServer('/api/auth', route)
      .post('/api/auth/sign-in')
      .auth(userMock.email, userMock.password)
      .then(res => {
        const { message, user, } = res.body;        
        let tokenCookie = res.headers['set-cookie'][0];
        let token = tokenCookie.substring(6, tokenCookie.length-8);

        const verifyToken = jwt.verify(token, config.jwt_secret);

        // verify Body Response
        expect(res.status).to.equal(200)
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('user')

        // Verify message
        expect(message).to.be.a('string')
        expect(message).to.equal('This user exist.')
        
        // Verify User 
        expect(user).to.have.property('_id')
        expect(user).to.have.property('name')
        expect(user).to.have.property('email')
        expect(user.email).to.equal(userMock.email)

        // Verify Token
        expect(verifyToken).to.have.property('iat')
        expect(verifyToken).to.have.property('exp')
        
        done()
      })
      .catch(err => done(err))
    })
    
    it('Sign Up-Create User', (done) => {
      testServer('/api/auth', route)
      .post('/api/auth/sign-up')
      .send({
        name: 'name',
        password: 'Password3',
        email:'name@undefined.com'
      })
      .then(res => {
        const { message, user } = res.body

        // Verify body
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('user')
        expect(res.status).to.equal(201)

        
        // Verify message
        expect(message).to.be.a('string')
        expect(message).to.equal('User created')
        
        // Verify User 
        expect(user).to.have.property('_id')
        expect(user).to.have.property('name')
        expect(user).to.have.property('email')
        expect(user).to.have.property('createdAt')
        expect(user).to.have.property('updatedAt')
        expect(user.email).to.equal(userMock.email)

        done()
      })
      .catch(err => done(err))
  })

});
