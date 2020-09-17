const { expect } = require('chai');
const sinon = require('sinon');
const authMiddleware = require('../middleware/is-auth');
const jwt = require('jsonwebtoken');

describe('Auth Middleware', () => {
  it('should throw an error if no authorization header is present', () => {
    const req = {
      get: () => null
    }
    // This is my solution
    //expect(() => authMiddleware(req, {}, () => {})).to.throw('Not authenticated.');

    // This is max solution
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated.');
  });

  it('should throw and error if the authorization header is only one string', () =>{
    const req = {
      get: () => 'xyz'
    }
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it('should throw an error if the token cannot be verifyed', () => {
    const req = {
      get: (headerName) => 'Bearer xyz'
    }
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it('should yield a userId after decoding the token', () => {
    const req = {
      get: (headerName) => 'Bearer dksafsrdjeajfericnds'
    }
    sinon.stub(jwt, 'verify');
    jwt.verify.returns({ userId: 'abc' });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId','abc');
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
})
