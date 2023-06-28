const express = require("express")
const router = express.Router()
const {PublishPost,GetFriendsPost,CommentPost,LikePost} = require('../controllers/Postcontroller')
const {authUser} = require('../middleware/auth')


router.route("/publish").post(authUser,PublishPost)
router.route("/getFriendsPost").get(authUser,GetFriendsPost)
router.route("/commentPost").post(authUser,CommentPost)
router.route("/LikePost").post(authUser,LikePost)


module.exports = router