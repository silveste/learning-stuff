const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 160
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' //IMPORTANT ref must match model therefore must start with capital letter as by convention all models start with capital letters
  }
}, {
  timestamps: true
});


//Required <HERE>    FDWWDS</HERE>
messageSchema.pre('remove', async function(next){
  try {
    //find a user
    let user = await User.findById(this.user);
    //remove the id of the message from the user messages list
    user.messages.remove(this.id);
    //save the user
    await user.save();
    //return next
    return next();
  } catch (e){
    return next(e);
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
