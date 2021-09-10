const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: String,
  password: String,
});

const User = model("User", userSchema);

module.exports = User;