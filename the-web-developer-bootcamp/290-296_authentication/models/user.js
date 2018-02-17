var
mongoose              = require ("mongoose"),
passportLocalMongoose = require ("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
//Add to User schema a set of methods to authenticate using
//local "way" under passport
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
