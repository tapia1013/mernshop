import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
}, {
  timestamps: true
});

// method to match hashpasswords and given password
userSchema.methods.matchPassword = async function (enteredPassword) {
  // bcrypt has a built in method to compare
  return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model('User', userSchema);

export default User;