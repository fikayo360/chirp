const express = require("express")
const router = express.Router()
const {register,login,forgotPassword,changePassword,findFriend,follow,unFollow,aroundYou,following,followers} = require('../controllers/Usercontroller')
const {authUser} = require('../middleware/auth')

router.route("/signup").post(register)
router.route("/login").post(login)
router.route("/search").post(authUser,findFriend)
router.route("/forgotPassword").post(authUser,forgotPassword)
router.route("/changePassword").post(authUser,changePassword)
router.route("/follow/?friendName").post(authUser,follow)
router.route("/unfollow/?friendName").post(authUser,unFollow)
router.route("/aroundYou").get(authUser,aroundYou)
router.route("/following").get(authUser,following)
router.route("/aroundYou").get(authUser,followers)


module.exports = router