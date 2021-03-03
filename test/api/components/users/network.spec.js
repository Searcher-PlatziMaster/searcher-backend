// const proxyquire = require('proxyquire');
// const jwt = require('jsonwebtoken');
// const expect = require('chai').expect;

// const { config } = require('../../../../src/config');
// const { testServer } = require('../../../../src/utils/testServer');
// const ControllerMock = require('../../../../src/utils/mocks/auth/controller');


// describe('Test to POST /api/auth/sign-in', () => {
//   const route = proxyquire('../../../../src/api/components/auth/network', {
//     './controller': ControllerMock
//   })
//   const userMock = {
//     email: 'name@undefined.com', 
//     password: 'Password3'
//   }

//   it('Sign Update Users', (done) => {
//     testServer()
//       .post('/api/auth/sign-in')
//       .auth(userMock.email, userMock.password)
//       .then(res => {
//         let tokenCookie = res.headers['set-cookie'][0];
//         let token = tokenCookie.substring(6, tokenCookie.length-8);
        
//         console.log("token", token);        
//         done()
//       })
//       .catch(err => done(err))
//     })
    
    
// });

