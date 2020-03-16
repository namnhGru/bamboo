import { model, Schema } from 'mongoose';

var roleSchema = new Schema({
  rolename: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

export default model('Role', roleSchema);

