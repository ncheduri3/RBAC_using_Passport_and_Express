const { default: next } = require('next');
const { rolePermission, permission } = require('../models');

const RolePermission = require('../models').RolePermission;
const Permission = require('../models').Permission;


module.exports.checkScopeOfUser = async (role_id, permission_name, res) => {
    const permission = await Permission.findOne({
        where: {
            permission_name: permission_name
        }
    })
    if(permission == null || role_id == null) {
        return false
    }
    const rolePermission = await RolePermission.findOne({
        where: {
            role_id: role_id,
            permission_id: permission.id
        }
    })
    if(rolePermission == null) 
        return false
    return true
 

}