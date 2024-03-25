const express = require('express')
const router = express.Router()

const videosController = require('../controllers/videoController')
const graphsController = require('../controllers/graphController')
const publicationController = require('../controllers/publicationController')
const peopleController = require('../controllers/peopleController')
const userController = require('../controllers/userController')
const roleController = require('../controllers/roleController')
const permissionController = require('../controllers/permissionController')

//imported custom middleware
const isAuth = require('./authCheckMiddleware').isAuth;

/**
 * end point: /api/video
 */
router.route('/video')
  .get(isAuth,videosController.getAllVideos)
  .post(isAuth, videosController.createNewVideo)
  .delete(isAuth, videosController.deleteVideo)
  .put(isAuth, videosController.editVideo)

/**
 * end point: /api/graphs
 */
router.route('/graph')
  .get(isAuth, graphsController.getAllGraphs)
  .post(isAuth, graphsController.createNewGraph)
  .delete(isAuth, graphsController.deleteGraph)
  .put(isAuth, graphsController.editGraph)



/**
 * end point: /api/pub
 */
router.route('/pub')
    .get(isAuth,publicationController.getAllPublication)
    .post(isAuth, publicationController.createNewPublication)
    .delete(isAuth, publicationController.deletePublication)
    .put(isAuth, publicationController.editPublication)


/**
 * end point: /api/people
 */
router.route('/people')
 .get(isAuth, peopleController.getAllPeople)
 .post(isAuth, peopleController.createNewPerson)
 .delete(isAuth, peopleController.deletePerson)
 .put(isAuth, peopleController.editPerson)


/**
 * (Authenticated)
 * end point: /api/user
 */
router.route('/user')
 .get(isAuth, userController.getUser)
 .post(isAuth, userController.createNewUser)
 .delete(isAuth, userController.deleteUser)
 .put(isAuth, userController.updateUser)


 /**
 * (Authenticated)
 * end point: /api/user
 */
router.route('/role')
.get(isAuth, roleController.getAllRoles)
.post(isAuth, roleController.createNewRole)
.delete(isAuth, roleController.deleteRole)
.put(isAuth, roleController.updateRole)

router.route('/role/:id').post(isAuth, roleController.addPermissionsToRole)

router.route('/role/:id').get(isAuth, roleController.getRoleById)

 /**
 * (Authenticated)
 * end point: /api/permission
 */
  router.route('/permission')
  .get(isAuth, permissionController.getAllPermissions)
  .post(isAuth, permissionController.createNewPermission)
  .delete(isAuth, permissionController.deletePermission)
  .put(isAuth, permissionController.updatePermission)



module.exports = router


