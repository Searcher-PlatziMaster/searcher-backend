const proxyquire = require('proxyquire');
const expect = require('chai').expect;

const testServer = require('../../../../src/utils/testServer');
const ControllerMock = require('../../../../src/utils/mocks/auth/controller');


describe('Test to POST /api/auth/sign-in', () => {
  const route = proxyquire('../../../../src/api/components/auth/network', {
    './controller': ControllerMock
  })

  it('Basic Auth', (done) => {
    testServer('/api/auth', route)
      .post('/api/auth/sign-in')
      .auth('name@undefines.com', 'Password3')
      .then(res => {
        expect(res.body).to.have.property('message')
        done()
      })
  })


});
