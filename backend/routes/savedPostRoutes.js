const express = require("express")
const router = express.Router()
const {CreateSavedPost,GetSavedPost,DeleteSavedPost} = require('../controllers/Savedpostcontroller')
const {authUser} = require('../middleware/auth')


router.route("/createSavedPost").post(authUser,CreateSavedPost)
router.route("/getSavedPost").post(authUser,GetSavedPost)
router.route("/DeleteSavedPost").delete(authUser,DeleteSavedPost)


module.exports = router