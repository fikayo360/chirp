const User = require('../models/User')
const bcrypt = require("bcrypt")
const {validateEmail }= require('../utils/validateEmail')
const customError = require('../errors')
const { StatusCodes } = require('http-status-codes');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const {sendEmailConfirmation} = require('../utils/sendEmail')

const register = async(req,res) => {
    const {username,email,password} = req.body

    if(validateEmail(email) === false){
        throw new customError.BadRequestError('incorrect email')
    }

    if (!username && !email && !password){
        return res.status(500).json("pls ensure fields are not empty ")
      }

    const foundUser = await User.findOne({username})
    
    const foundEmail = await User.findOne({email})

    if (foundEmail || foundUser) {
        throw new customError.BadRequestError('that user already exists')
    }

    try{
        const savedUser  = await User.create({username,email, password: bcrypt.hashSync(password, 10)})
        const tokenUser = createTokenUser(savedUser)
        attachCookiesToResponse({res,user:tokenUser})
        res.status(StatusCodes.OK).json({user:tokenUser})
       // sendEmailConfirmation(process.env.EMAIL,savedUser.email)
    }
    catch(err){
        throw new customError.BadRequestError(err)
    }
}

const login = async (req,res) => {
    const {username,password} = req.body
    if (!username || !password){
        return res.status(500).json("pls ensure fields are not empty ")
      }
    try{  
    const foundUser = await User.findOne({username})
    if(!foundUser){
        throw new customError.NotFoundError('user does not exist')
    }
    
    if(!bcrypt.compareSync(password,foundUser.password)){
        throw new customError.UnauthenticatedError('wrong password')
     }
     const { password: foundUserPassword, ...others } = foundUser._doc;
     const tokenUser = createTokenUser(others);
     attachCookiesToResponse({ res, user: tokenUser });
     res.status(StatusCodes.OK).json({ user: others });
    
    }
    catch(err){
        throw new customError.BadRequestError(err)
    }
}

const forgotPassword = async (req,res) => {
    const {securityPhrase} = req.body
    try{
        const sessionUser = req.username
        const founduser = User.findOne({sessionUser})
        if(!founduser){
            throw new customError.NotFoundError('session user not found')
        }

        if(founduser.securityPhrase !== securityPhrase){
            throw new customError.BadRequestError('incorrect security phrase')
        }else{
            res.staus(StatusCodes.OK).json('correct credentials')
        }
    }
    catch(err){
        throw new customError.BadRequestError(err)
    }
}

const changePassword = async (req,res) => {
    const {newPassword} = req.body
    const sessionUser = req.username
    try{
        const found = User.findOne({sessionUser})
        if (!found){throw new customError.NotFoundError('sesseion user not found')}
        found.password = newPassword
        found.save()
        res.staus(StatusCodes.OK).json('password changed succesfully')
    }
    catch(err){
        throw new customError.BadRequestError(err)
    }
}

const findFriend = async (req,res) => {
    const {friendName} = req.query
    try{
        const friend = await User.findOne({friendName})
        if(!friend) {throw new customError.NotFoundError('user not found ')}
        res.status(StatusCodes.OK).json(friend)
    }
    catch(err){
        throw new customError.BadRequestError(err)
    }
}

const follow = async (req,res) => {
    const {friendName} = req.query
    let newFriends = []
    try{
        const sessionUser = await User.findOne(req.username)
        if(!sessionUser){throw new customError.NotFoundError('sesseion user not found')}
        if(friendName === sessionUser.username){throw new customError.BadRequestError('cant add yourself')}

        if(!sessionUser.friends.includes(friendName)){
            newFriends = [...sessionUser.friends,friendName]
            sessionUser.friends = newFriends
            sessionUser.save()
            res.status(StatusCodes.Ok).json(`${friendName} added succesfully`)
        }else{
            throw new customError.BadRequestError('error occured while adding friend')
        }
    }catch(err){
        throw new customError.BadRequestError(err)
    }
}

const unFollow = async (req,res) => {
    const {friendName} = req.query
    try{
        const sessionUser = await User.findOne(req.username)
        if(!sessionUser){throw new customError.NotFoundError('sesseion user not found')}
        if(sessionUser.friends.includes(friendName)){
            let newUsers = sessionUser.friends.filter(item => item !== friendName)
            sessionUser.friends = newUsers
            sessionUser.save()
            res.status(StatusCodes.Ok).json(`${friendName} removed succesfully`)
        }
        else{
            throw new customError.BadRequestError('error occured while removing friend')
        }
    }catch(err){
        throw new customError.BadRequestError(err)
    }
}

const aroundYou = async (req,res) => {
    try{
        const sessionUser = await User.findOne(req.username)
        if(!sessionUser){throw new customError.NotFoundError('sesseion user not found')}
        let aroundYou = []
        const sameZip = await User.find({'zipcode':sessionUser.zipcode})
        const sameStates = await User.find({'state':sessionUser.state})
        aroundYou = [...sameZip,...sameStates]
        res.status(Status.Ok).json(aroundYou)
    }catch(err){
        throw new customError.BadRequestError(err)
    }
}

const following = async (req,res) => {
    try{
        const sessionUser = await User.findOne(req.username)
        if(!sessionUser){throw new customError.NotFoundError('sesseion user not found')}
        let following =  [...sessionUser.friends]
        res.status(Status.Ok).json(following)
    }catch(err){
        throw new customError.BadRequestError(err)
    }
}

const followers = async(req,res) => {
    try{
        const sessionUser = await User.findOne(req.username)
        if(!sessionUser){throw new customError.NotFoundError('sesseion user not found')}
        const allUsers = User.find()
        let followers = []
        allUsers.forEach((user,index) => {
            if(user.friends.includes(sessionUser.username)){
                followers.push(user)
            }
        })
        res.status(StatusCodes.Ok).json(followers)
    }catch(err){
        throw new customError.BadRequestError(err) 
    }
}

module.exports = {register,login,forgotPassword,changePassword,findFriend,follow,unFollow,aroundYou,following,followers}