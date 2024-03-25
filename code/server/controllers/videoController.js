const db = require("../models");

const Video  = db.video;

const Op = db.Sequelize.Op;

const checkScopeOfUser = require('../utils/scopeCheckHelper').checkScopeOfUser;

const createNewVideo = async (req,res) => {
    const data = req.body
    try {
      const isInScope = await checkScopeOfUser(req.user.role_id, "create_video", res)
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
      const vid = await Video.create({ title: title, source: source, created_by: req.session.user.username});
      res.status(200).json("Video record created successfuly!");
      return
    } catch(e) {
      res.status(400).json({
        status: "Fail",
        message: e.message
      })
      return
    }  
}

const getAllVideos = async (req,res) => {

  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "view_video", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    // validate inputs 
    const videos = await Video.findAll();
    res.status(200).json({
      "norp_videos": videos
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
// deletes video by Id
const deleteVideo = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "delete_video", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const id = data.id
    // validate inputs 
    if (id === undefined) {
      throw new Error("Invalid Id")
    }
    await Video.destroy({where: {id: id}});
    res.status(200).json("Video record deleted successfuly");
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
const editVideo = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "update_video", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const id = data.id
    const title = data.title
    const source = data.source
    // validate inputs 
    if (id === undefined || title === undefined || source == undefined) {
      throw new Error("Invalid Title or Source or id")
    }
    const vid = await Video.findOne({where: {id: id}});
    if(vid == null) {
      res.status(404).send("Video record not found.")
      return;
    }
    vid.title = title
    vid.source = source
    await vid.save();
    res.status(200).json("Video record updated successfuly");
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
  createNewVideo,
  getAllVideos,
  deleteVideo,
  editVideo
}