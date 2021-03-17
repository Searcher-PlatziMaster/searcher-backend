const proxyquire = require('proxyquire');
const expect = require('chai').expect;

const { testServer } = require('../src/utils/testServer');
const ControllerMock = require('../src/utils/mocks/auth/controller');

const userMock = {
  email: 'name@undefined.com',
  password: 'Password3'
}

describe('Test to POST /api/auth/sign-in', () => {
  const route = proxyquire('../src/api/components/auth/network', {
    './controller': ControllerMock
  })

  it('Sign In-Basic Auth', (done) => {
    testServer('/api/auth', route)
      .post('/api/auth/sign-in')
      .auth(userMock.email, userMock.password)
      .end((err, res) => {
        if(err) done(err)
        const { token } = res.body;
        
        expect(token).exist
        done()
        
      })
    })
    it('Sign In-Basic Auth', (done) => {
      testServer('/api/auth', route)
      .post('/api/auth/sign-in')
      .auth(userMock.email, userMock.password)
      .end((err, res) => {
        if(err) done(err)
        const { token } = res.body;
        expect(token).exist
        done()
       
      })
  })

});
