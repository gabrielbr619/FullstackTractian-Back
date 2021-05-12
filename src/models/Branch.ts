import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  localization: {
    type: String,
    required: false
  },
  active: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref:"active"
  }],
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"company"
  }
})

const Branch = mongoose.model('branch', branchSchema)

export default Branch