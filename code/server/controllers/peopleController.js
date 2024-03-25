const db = require("../models");

const People = db.people;

const Op = db.Sequelize.Op;

const checkScopeOfUser = require('../utils/scopeCheckHelper').checkScopeOfUser;
/**
 * 
 * /api/people:
 *  post: 
 *    summary:
 *    description: 
 *    input: {
            "first_name": "Calton",
            "last_name": "Pu",
            "project_title": "Director",
            "job_type": "Professor, , John P. Imlay, Jr. Chair",
            "university": "Georgia Institute of Technology"
        }
 *    output:
 */
const createNewPerson = async (req,res) => {
  const data = req.body
 
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "create_person", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const first_name = data.first_name
    const last_name = data.last_name
    const project_title = data.project_title
    const job_type = data.job_type
    const university = data.university
    const profile_pic_url = data.profile_pic_url

    // validate inputs 
    if (first_name === undefined) {
      throw new Error("First name or last name not defined")
    }
    const people = await People.create({ first_name: first_name, 
      last_name: last_name,
      project_title: project_title,
      job_type: job_type,
      university: university,
      profile_pic_url: profile_pic_url,
      created_by: req.session.user.username
    });

    res.status(201).json({
      status: "success",
      person: people
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
 *  get: 
 *    summary:
 *    description: 
 *    output:
 */
const getAllPeople = async (req,res) => {

try {
  const isInScope = await checkScopeOfUser(req.user.role_id, "view_people", res)
  if( isInScope == false){
    res.status(403).send("Access denied!")
    return
  } 
  // validate inputs 
  const people = await People.findAll();
  res.status(200).json({
    "norp_people": people
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
 *  delete: 
 *    summary:
 *    description: 
 *    output:
 */
const deletePerson = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "delete_person", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const id = data.id
    // validate inputs 
    if (id === undefined) {
      throw new Error("id not defined")
    }
    await People.destroy({where: {id: id}});
    res.status(200).json({status:"Person deleted successfuly!"});
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
const editPerson = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "update_person", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const id = data.id
    const first_name = data.first_name
    const last_name = data.last_name
    const project_title = data.project_title
    const job_type = data.job_type
    const university = data.university
    const profile_pic_url = data.profile_pic_url

    // validate inputs 
    if (id === undefined ) {
      throw new Error("ID not defined")
    }
    if (first_name === undefined || last_name === undefined) {
      throw new Error("First name or last name not defined")
    }
   
    const people = await People.findOne({where: {id: id}});
    if(people == null) {
      res.status(404).send("Person not found!");
      return;
    }
    people.first_name = first_name
    people.last_name = last_name
    people.project_title = project_title
    people.job_type = job_type
    people.university = university
    people.profile_pic_url = profile_pic_url

    await people.save();
    res.status(200).json({
      status: "Person updated successfuly!",
      person: people
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
  createNewPerson,
  getAllPeople,
  deletePerson,
  editPerson
}