import { model, Schema, SchemaTypes } from 'mongoose';

var menuSchema = new Schema({
  icon: String,
  name1: String,
  name2: String,
  link: String,
  order: {
    type: Number,
    required: true,
  },
  parent: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

export default model('menu', menuSchema);

