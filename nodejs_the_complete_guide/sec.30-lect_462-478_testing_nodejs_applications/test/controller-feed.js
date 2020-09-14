const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const FeedController = require('../controllers/feed');

describe('Feed Controller', () =>{
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
  });

  it('should add a created post to the posts of the creator', (done) => {

    const req = {
      body: {
        title: 'Test post',
        content: 'A test post'
      },
      file: {
        path: 'the/file/path'
      },
      userId: userInDb._id.toString()
    };

    const res = {
      status: function(){ return this; },
      json: function(){ return this; }
    }

    FeedController.createPost(req,res,() => {})
      .then(user => {
        expect(user).to.have.property('posts');
        expect(user.posts).to.have.length(1);
        done();
      });
  });

  after((done) => {
    User.deleteMany({})
      .then(() => mongoose.disconnect())
      .then(() => done());
  })
})
