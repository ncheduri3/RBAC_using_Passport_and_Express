const db = require("../models");

const Graph  = db.graph;

const Op = db.Sequelize.Op;

const checkScopeOfUser = require('../utils/scopeCheckHelper').checkScopeOfUser;

const createNewGraph = async (req,res) => {
    const data = req.body
    try {
      const isInScope = await checkScopeOfUser(req.user.role_id, "create_graph", res)
      if( isInScope == false){
        res.status(403).send("Access denied!")
        return
      } 
      const title = data.title
      const source = data.source
      // validate inputs 
      if (title === undefined || source == undefined) {
        throw new Error("Invalid Title or Source or ID")
      }
      const graph = await Graph.create({ title: title, source: source, created_by: req.session.user.username});
      res.status(201).json("Graph created successfuly!");
      return
    } catch(e) {
      res.status(400).json({
        status: "Fail",
        message: e.message
      })
      return
    }  
}

const getAllGraphs = async (req,res) => {

  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "view_graph", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    // validate inputs 
    const graphs = await Graph.findAll();
    res.status(200).json({
      "norp_graphs": graphs
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
const deleteGraph = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "delete_graph", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const id = data.id
    // validate inputs 
    if (id === undefined) {
      throw new Error("Invalid Id")
    }
    await Graph.destroy({where: {id: id}});
    res.status(200).json("Graph deleted!");
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
const editGraph = async (req,res) => {
  const data = req.body
  try {
    const isInScope = await checkScopeOfUser(req.user.role_id, "update_graph", res)
    if( isInScope == false){
      res.status(403).send("Access denied!")
      return
    } 
    const id = data.id
    const title = data.title
    const source = data.source
    // validate inputs 
    if (id === undefined || title === undefined || source == undefined) {
      throw new Error("Invalid Title or Source or ID")
    }
    const graph = await Graph.findOne({where: {id: id}});
    if(graph == null) {
      res.status(404).send("Graph not found");
      return;
    }
    graph.title = title
    graph.source = source
    await graph.save();
    res.status(200).json("Graph updated successfuly!");
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
  createNewGraph,
  getAllGraphs,
  deleteGraph,
  editGraph
}