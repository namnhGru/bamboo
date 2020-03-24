import { model, Schema, SchemaTypes } from 'mongoose';

var tokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: SchemaTypes.ObjectId,
    required: true,
    unique: true
  },
  exp: {
    type: Date,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

export default model('token', tokenSchema);

