const e = require("express");
const db = require("../models");

const Role  = db.Role;
const Permission = db.Permission;
const User = db.User

const Op = db.Sequelize.Op;

const checkScopeOfUser = require('../utils/scopeCheckHelper').checkScopeOfUser;

const createNewRole = async (req,res) => {
    const data = req.body
    try {
      const isInScope = await checkScopeOfUser(req.user.role_id, "create_role", res)
      if( isInScope == false){
        res.status(403).send("Access denied!")
        return
      } 
  
      const name = data.role_name
      const role_description = data.role_description
      // validate inputs 
      if (name === undefined) {
        throw new Error("Invalid role_name")
      }
      const role = await Role.create({ role_name: name, role_description: role_description, created_by: req.session.user.username});
      res.status(201).json("Role created successfuly!");
      return
    } catch(e) {
      res.status(400).json({
        status: "Fail",
        message: e.message
      })
      return
    }  
}

const getAllRoles = async (req,res) => {

  try {
    // const isInScope = await checkScopeOfUser(req.user.role_id, "view_role", res)
    // if( isInScope == false){
    //   res.status(403).send("Access denied!")
    //   return
    // } 

    // validate inputs 
    const roles = await Role.findAll({include: [{model: User, as: "users"}, {model: Permission, as: "permissions"}]});
    res.status(200).json({
      "user_roles": roles
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

const deleteRole = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "delete_role", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 

    const id = data.id
    // validate inputs 
    if (id === undefined) {
      throw new Error("Invalid Id")
    }
    await Role.destroy({where: {id: id}});
    res.status(200).json("Role deleted!");
    return
  } catch(e) {
    res.status(400).json({
      status: "Fail",
      message: e.message
    })
    return
  } 
}


const updateRole = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "update_role", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 

    const id = data.id
    const role_name = data.role_name
    const role_description = data.role_description
    // validate inputs 
    if (id === undefined || role_name === undefined) {
      throw new Error("Invalid id or role_name")
    }
    const role = await Role.findOne({where: {id: id}});
    if(graph == null) {
      res.status(404).send("Role not found");
      return;
    }
    role.role_name = role_name
    role.role_description = role_description || role.role_description
    await role.save();
    res.status(200).json("Role updated successfuly!");
    return
  } catch(e) {
    res.status(400).json({
      status: "Fail",
      message: e.message
    })
    return
  }  
}

const addPermissionsToRole = async (req, res) => {
  const data = req.body
  try {
    // const isInScope = await checkScopeOfUser(req.user.role_id, "update_role", res)
    // if( isInScope == false){
    //   res.status(403).send("Access denied!")
    //   return
    // } 

    const permissions_list = data.permissions_list
    const role = await Role.findOne({where: {id: req.params.id}});
    if(role == null) {
      res.status(404).send("Role not found");
      return;
    }
    for(perm of permissions_list) {
      const permission = await Permission.findAll({where: {permission_name: perm}});
      if(permission == null) {
        res.status(404).send("Permission not found");
        return;
      }
      await role.addPermissions(permission, {through : {selfGranted: false}})
    }
    // JSON.parse(permissionsList).forEach(function (item, index) {

    // })
    res.status(200).json("Permissions added successfuly!");
  } catch(e) {
    res.status(400).json({
      status: "Fail",
      message: e.message
    })
    return
  }
}

const getRoleById = async (req,res) => {

  try {
    // const isInScope = await checkScopeOfUser(req.user.role_id, "view_role", res)
    // if( isInScope == false){
    //   res.status(403).send("Access denied!")
    //   return
    // } 

    // validate inputs 
    const role = await Role.findAll({include: [{model: User, as: "users"}]});
    res.status(200).json({
      "user-role": role
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


module.exports = {
  createNewRole,
  getAllRoles,
  deleteRole,
  updateRole,
  addPermissionsToRole,
  getRoleById
}