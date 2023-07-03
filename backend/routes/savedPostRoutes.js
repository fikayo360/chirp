const express = require("express")
const router = express.Router()
const {createSavedPost,getSavedPosts,deleteSavedPost} = require('../controllers/Savedpostcontroller')
const {authUser} = require('../middleware/auth')


router.route("/createSavedPost").post(authUser,createSavedPost)
router.route("/getSavedPosts").post(authUser,getSavedPosts)
router.route("/DeleteSavedPost").delete(authUser,deleteSavedPost)


module.exports = router