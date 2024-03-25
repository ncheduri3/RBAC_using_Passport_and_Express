const db = require("../models");

const Permission  = db.Permission;

const Op = db.Sequelize.Op;

const checkScopeOfUser = require('../utils/scopeCheckHelper').checkScopeOfUser;

const createNewPermission = async (req,res) => {
    const data = req.body
    try {
      const isInScope = await checkScopeOfUser(req.user.role_id, "create_permission", res)
      if( isInScope == false){
        res.status(403).send("Access denied!")
        return
      } 
      const permission_name = data.permission_name
      const permission_description = data.permission_description
      // validate inputs 
      if (permission_name === undefined) {
        throw new Error("Invalid permission_name")
      }
      const permission = await Permission.create({ permission_name: permission_name, permission_description: permission_description, created_by: req.session.user.username});
      res.status(201).json("Permission created successfuly!");
      return
    } catch(e) {
      res.status(400).json({
        status: "Fail",
        message: e.message
      })
      return
    }  
}

const getAllPermissions = async (req,res) => {

  try {
    // validate
    const isInScope = await checkScopeOfUser(req.user.role_id, "view_permission", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    }  inputs 
    const permissions = await Permission.findAll();
    res.status(200).json({
      "norp_permissions": permissions
    });
    return
  } catch(e) {
    res.status(400).json({
      status: "Fail",
      message: e.message
    })
    return
  } 
  
}

// need to check error
// deletes graph by Id
const deletePermission = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "delete_permission", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const id = data.id
    // validate inputs 
    if (id === undefined) {
      throw new Error("Invalid Id")
    }
    await Permission.destroy({where: {id: id}});
    res.status(200).json("Permission deleted!");
    return
  } catch(e) {
    res.status(400).json({
      status: "Fail",
      message: e.message
    })
    return
  } 
}

// update graph
const updatePermission = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "update_permission", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const id = data.id
    const permission_name = data.permission_name
    const permission_description = data.permission_description
    const permission_on_resource = data.permission_on_resource
    // validate inputs 
    if (id === undefined || permission_name === undefined) {
      throw new Error("Invalid id or permission_name")
    }
    const permission = await Permission.findOne({where: {id: id}});
    if(permission == null) {
      res.status(404).send("Permission not found");
      return;
    }
    permission.permission_name = permission_name
    permission.permission_description = permission_description || permission.permission_description
    permission.permission_on_resource = permission_on_resource || permission.permission_on_resource
    await permission.save();
    res.status(200).json("Permission updated successfuly!");
    return
  } catch(e) {
    res.status(400).json({
      status: "Fail",
      message: e.message
    })
    return
  }  
}

module.exports = {
  createNewPermission,
  getAllPermissions,
  deletePermission,
  updatePermission
}