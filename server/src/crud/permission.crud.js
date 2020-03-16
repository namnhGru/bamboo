import PermissionCollection from '../collection/permission.collection'
import { getAll, updateOne } from '../utils/base.crud'

export default {
  getAll: getAll(PermissionCollection),
  updateOne: updateOne(PermissionCollection),
}