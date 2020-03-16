import RoleCollection from '../collection/role.collection'
import PermissionCollection from '../collection/permission.collection'
import MenuCollection from '../collection/menu.collection'
import makeCRUD from '../utils/base.crud'

const createOne = () => (req, res) => {
  try {
    RoleCollection.createOne(req.body)
      .then(role => {
        res.status(200).json({ data: role })
        MenuCollection.getAll()
          .then(menus => 
          menus.forEach(menu => {
            PermissionCollection.createOne({
              accesslevel: 0,
              menuid: menu._id,
              roleid: role._id,
              status: true,
            })
          })
        )})
      .catch(console.error)
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

export default {
  ...makeCRUD(RoleCollection), 
  createOne: createOne()
}