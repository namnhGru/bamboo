import { model, Schema, SchemaTypes } from 'mongoose';

var permissionSchema = new Schema({
  roleid: {
    type: SchemaTypes.ObjectId,
    ref: 'role',
    required: true,
  },
  menuid: {
    type: SchemaTypes.ObjectId,
    ref: 'menu',
    required: true,
  },
  accesslevel: {
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


export default model('permission', permissionSchema);

