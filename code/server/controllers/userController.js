const db = require("../models");
const generatePassword = require('../utils/passwordUtil').generatePassword;

const User = db.User;

const Op = db.Sequelize.Op;

const checkScopeOfUser = require('../utils/scopeCheckHelper').checkScopeOfUser;

/**
 * 
 *  Create User from Authentication
 *  put: 
 *    summary:
 *    description: 
 *    output:
 */
const createNewUser = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "create_user", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const is_superuser = JSON.parse(data.is_superuser)
    const username = data.username
    const last_name = data.last_name
    const first_name = data.first_name
    const email = data.email
    const is_staff = JSON.parse(data.is_staff)
    const is_active = JSON.parse(data.is_active)
    const date_join = Date.now().toString()
    const password = data.password
    const created_by = req.session.user.username;
    const role_id = data.role_id;

    console.log(is_superuser)

    // validate inputs 
    if (username === undefined || password == undefined) {
      throw new Error("Invalid Username or Password")
    }
    const { salt, hash } = generatePassword(password); 
    const user = await User.create({ 
        is_superuser: is_superuser,
        username: username,
        last_name: last_name,
        first_name: first_name,
        email: email,
        is_staff: is_staff,
        is_active: is_active,
        date_joined: date_join,
        salt: salt,
        hash: hash,
        created_by: created_by,
        role_id: role_id
    });
  
    res.status(201).json("User created successfuly");
    return
  } catch(e) {
    // Validation Error: can mean user already created
    res.status(400).json({
      status: "Fail",
      message: e.message
    })
    return
  }  
}

// get User
const getUser = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "view_user", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 

    const username = data.username
    
    // validate inputs 
    if (username === undefined) {
      throw new Error("Invalid Username")
    }
    const user = await User.findOne({where: {username: username}});

    res.status(200).json({
      status: "success",
      user: user
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





/**
 * 
 * /api/people:
 *  put: 
 *    summary:
 *    description: 
 *    output:
 */
const updateUser = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "update_user", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const is_superuser = data.is_superuser
    const username = data.username
    const last_name = data.last_name
    const first_name = data.first_name
    const email = data.email
    const is_staff = data.is_staff
    const is_active = data.is_active
    const password = data.password
    const role_id = data.role_id

    // validate inputs 
    if (username === undefined || password == undefined) {
      throw new Error("Invalid username or password")
    }
    const { salt, hash } = generatePassword(password); 
    const user = await User.findOne({where: {username: username}});
    if (user != null) {
      user.is_superuser = is_superuser
      user.last_name = last_name
      user.first_name = first_name
      user.email = email
      user.is_staff = is_staff
      user.is_active = is_active
      user.salt = salt
      user.hash = hash
      user.role_id = data.role_id || user.role_id
      await user.save()
      res.status(201).json("User updated successfuly!");
      return
    } else {
      const user = await User.create({ 
        is_superuser: is_superuser,
        username: username,
        last_name: last_name,
        first_name: first_name,
        email: email,
        is_staff: is_staff,
        is_active: is_active,
        date_joined: Date.now().toString(),
        salt: salt,
        hash: hash,
        role_id: data.role_id,
        created_by: req.session.user.username
    });
  
    res.status(201).json("User created successfuly!");
    return
    }

  } catch(e) {
    res.status(400).json({
      status: "Fail",
      message: e.message
    })
    return
  }  
}


// delete User
const deleteUser = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "delete_user", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const username  = data.username
    // validate inputs 
    // validate inputs 
    if (username === undefined) {
      throw new Error("Invalid Username")
    }
    await User.destroy({where: {username: username}});
    res.status(204).json("User Deleted!");
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
  createNewUser,
  deleteUser,
  updateUser,
  getUser
}