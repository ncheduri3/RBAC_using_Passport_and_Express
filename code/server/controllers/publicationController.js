const db = require("../models");

const Publication  = db.publication;

const Op = db.Sequelize.Op;

const checkScopeOfUser = require('../utils/scopeCheckHelper').checkScopeOfUser;
/**
 * 
 * /api/pub:
 *  post: 
 *    summary:
 *    description: 
 *    input:
 *          {
 *             title: "ABC",
 *             source: "Kim H. ... "
 *          }
 *    output:
 *          {
              "status": "success",
              "pub": {
                  "id": 3,
                  "title": " Socioeconomic Diversity, Political Engagement, and the Density of Nonprofit Organizations in U.S. Countis",
                  "source": "Kim, M. (2015). Socioeconomic Diversity, Political Engagement, and the Density of Nonprofit Organizations in U.S. Counties. The American Review of Public Administration, 45(4), 402–416. https://doi.org/10.1177/0275074013504616"
              }
            }
 */
const createNewPublication = async (req,res) => {
    const data = req.body
    try {
      const isInScope = await checkScopeOfUser(req.user.role_id, "create_publication", res)
      if( isInScope == false){
        res.status(403).send("Access denied!")
        return
      } 
      const title = data.title
      const source = data.source
      // validate inputs 
      if (title === undefined || source == undefined) {
        throw new Error("Invalid Title or Source")
      }
      const pub = await Publication.create({ title: title, source: source, created_by: req.session.user.username});
      res.status(201).json("Publication record created successfuly");
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
 * /api/pub:
 *  post: 
 *    summary:
 *    description: 
 *    output:
 *          {
 *            "norp_pubs": []
 *          }
 */

const getAllPublication = async (req,res) => {

  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "view_publication", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    // validate inputs 
    const pubs = await Publication.findAll();
    res.status(200).json({
      "norp_pubs": pubs
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
 * /api/pub:
 *  post: 
 *    summary:
 *    description: 
 *    input : 
 *       {
            "id": 1
           }
 *    output:
 *          {
 *            "norp_pubs": []
 *          }
 */
// need to check error
// deletes video by Id

const deletePublication = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "delete_publication", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const id = data.id
    // validate inputs 
    if (id === undefined) {
      throw new Error("Invalid Id")
    }
    await Publication.destroy({where: {id: id}});
    res.status(200).json("Publication record deleted successfuly");
    return
  } catch(e) {
    res.status(400).json({
      status: "Fail",
      message: e.message
    })
    return
  } 
}

// update video
const editPublication = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "update_publication", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const id = data.id
    const title = data.title
    const source = data.source
    // validate inputs 
    if (id === undefined || title === undefined || source == undefined) {
      throw new Error("Invalid Title or Source")
    }
    const pub = await Publication.findOne({where: {id: id}});
    if(pub == null) {
      res.status(404).send("Publication not found!");
      return;
    }
    pub.title = title
    pub.source = source
    await pub.save();
    res.status(200).json("Publication record created successfuly");
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
  createNewPublication,
  getAllPublication,
  deletePublication,
  editPublication
}