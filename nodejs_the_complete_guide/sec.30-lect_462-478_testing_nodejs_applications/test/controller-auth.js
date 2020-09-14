const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller - Login', () =>{
  let userInDb;
  before((done) => {
    mongoose.connect('mongodb://localhost/test')
      .then(result => {
        const user = new User({
          email: 'test@email.com',
          password: '123456',
          name: 'Tester',
          posts: []
        });
        return user.save();
      })
      .then(user => {
        userInDb = user;
        done();
      });
  })
  it('should trow an error if accessing the DB fails', (done) => {
    sinon.stub(User, 'findOne');
    User.findOne.throws();
    const req = {
      body: {
        email: 'test@test.com',
        password: 'tester'
      }
    }
    // login method calls next when there is an error. Therefore the 3rd arg is the function that returns the reuslt
    AuthController.login(req,{},(err) => err).then(result => {
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 500);
      done();
    })
    User.findOne.restore();
  });

  it('should send a response with a valid user status for a valid user', (done) => {
    const req = { userId: userInDb._id.toString() }
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.userStatus = data.status;
      }
    };
    AuthController.getUserStatus(req, res , () => {})
      .then(() => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.userStatus).to.be.equal('I am new!');
        done();
      })
  });

  after((done) => {
    User.deleteMany({})
      .then(() => mongoose.disconnect())
      .then(() => done());
  })
})
