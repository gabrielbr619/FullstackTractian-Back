import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:"company"
  }
})

const User = mongoose.model('user', userSchema)

export default User