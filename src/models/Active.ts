import mongoose from 'mongoose';

const activeSchema = new mongoose.Schema({
  img: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  model: {
    type: String,
    required: false
  },
  responsible: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  healthLevel: {
    type: Number,
    required: true
  },
  branch:{
    type: mongoose.Schema.Types.ObjectId, ref: "branch",
    active:[{
      type: mongoose.Schema.Types.ObjectId, ref: "active"
    }]
  }
})

const Active = mongoose.model('active', activeSchema)

export default Active