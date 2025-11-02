import mongoose from 'mongoose'

const grievanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userType: { type: String, enum: ['Student','Faculty','Staff','Other'], required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  file: { type: String },
  isAnonymous: { type: Boolean, default: false },
  status: { type: String, enum: ['Pending','In Progress','Resolved','Rejected'], default: 'Pending' },
}, { timestamps: true })

const Grievance = mongoose.model('Grievance', grievanceSchema)
export default Grievance
