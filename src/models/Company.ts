import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: false
  },
  branch:[{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "branch"
  }],
  users:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }]
})

const Company = mongoose.model('company', companySchema)

export default Company