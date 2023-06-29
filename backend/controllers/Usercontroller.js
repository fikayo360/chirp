const User = require('../models/User')
const bcrypt = require("bcrypt")
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {validateEmail }= require('../utils/validateEmail')
const customError = require('../errors')
const { StatusCodes } = require('http-status-codes');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const {sendEmailConfirmation} = require('../utils/sendEmail')

const register = async(req,res) => {
    const {username,email,password,securityPhrase} = req.body

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
     let cookie = attachCookiesToResponse({ res, user: tokenUser });
     res.status(StatusCodes.OK).json({ user: others,cookie });
    
    }
    catch(err){
        throw new customError.BadRequestError(err)
    }
}

const forgotPassword = async (req,res) => {
    const {emailaddress} = req.body
    const founduser = User.findOne({emailaddress})
    if(!founduser){
        throw new customError.NotFoundError('user not found')
    }
    try{
        function generateToken(email, expiresIn) {
        const secretKey = process.env.JWT_SECRET; 
        const token = jwt.sign({ email }, secretKey, { expiresIn });
        return token;
         }
        
        // Send the reset token via email to the user's email address
        const sendResetToken = (email) => {
            let tokenData = generateToken()
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user:process.env.EMAIL,
                    pass: process.env.EMAILPASS
                }
            })
            let mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'password reset',
                text: `use the following to reset your password ${tokenData}`
            }
           
            founduser.resettoken = tokenData
            founduser.save()
           transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.log('Error sending email:', error);
            } else {
            console.log('Email sent:', info.response);
            }
        });
        }

        sendResetToken(emailaddress)
        res.status(200).json({ message: 'Reset token sent successfully' });
    }
    catch(err){
        throw new customError.BadRequestError(err)
    }
}

const changePassword = async (req,res) => {
    const {token,newPassword} = req.body
    function verifyResetToken(resetToken) {
        try {
          const secretKey = process.env.JWT_SECRET; 
          const decodedToken = jwt.verify(resetToken, secretKey);
          const userEmail = decodedToken.email;
        
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                res.status(400).json('Token expired');
              } else {
                res.status(400).json('Token verification failed:', error.message);
              }
        }
      }
      
      try{
        const tokenValid = verifyResetToken(token)
        if(tokenValid){
            const tokenUser = await User.findOne({emailaddress:tokenValid.email})
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            tokenUser.password = hashedPassword;
            tokenUser.resettoken = undefined;
            await tokenUser.save();
            res.json({ message: 'password updated successfully' });
        }
      }
      catch(err){
        throw new customError.BadRequestError(err)
      }
}

const findFriend = async (req,res) => {
    const { username } = req.body
    
    try{
        const foundUser = await User.findOne({username})
        if(!foundUser){
            throw new customError.NotFoundError('user does not exist')
        }
        const { password, ...others } = foundUser._doc;
        res.status(StatusCodes.OK).json(others)
    }
    catch(err){
        throw new customError.BadRequestError(err)
    }
    /*
    
    */
    
}

const follow = async (req,res) => {
    const {friendName} = req.params
    let newFriends = []
    try{
        const sessionUser = await User.findOne({username:req.user.username})
        if(!sessionUser){throw new customError.NotFoundError('sesseion user not found')}
        if(friendName === sessionUser.username){throw new customError.BadRequestError('cant add yourself')}

        if(!sessionUser.friends.includes(friendName)){
            newFriends = [...sessionUser.friends,friendName]
            sessionUser.friends = newFriends
            sessionUser.save()
            res.status(StatusCodes.OK).json(`${friendName} added succesfully`)
        }else{
            throw new customError.BadRequestError('error occured while adding friend')
        }
    }catch(err){
        throw new customError.BadRequestError(err)
    }
}

const unFollow = async (req,res) => {
    const sessionUser = await User.findOne({username:req.user.username})
    const {friendName} = req.params
    try{
      
        if(!sessionUser){throw new customError.NotFoundError('sesseion user not found')}
        if(sessionUser.friends.includes(friendName)){
            let newUsers = sessionUser.friends.filter(item => item !== friendName)
            sessionUser.friends = newUsers
            sessionUser.save()
            res.status(StatusCodes.OK).json(`${friendName} removed succesfully`)
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
        const sessionUser = await User.findOne({username:req.user.username})
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

 /*
const completeProfile = async (req,res) => {
    try{

    }catch(err){

    }
}
  */

const following = async (req,res) => {
    try{
        const sessionUser = await User.findOne({username:req.user.username})
        console.log(sessionUser)
        if(!sessionUser){throw new customError.NotFoundError('sesseion user not found')}
        const following = await Promise.all(
            sessionUser.friends.map(async (friend) => {
              const foundFriend = await User.findOne({ username: friend })
              const { password, ...others } = foundFriend._doc
              return others
            })
          );
          
          console.log(following);
        
        res.status(StatusCodes.OK).json(following)
    }catch(err){
        throw new customError.BadRequestError(err)
    }
}

const followers = async(req,res) => {
    try{
        const sessionUser = await User.findOne({username:req.user.username})
        if(!sessionUser){throw new customError.NotFoundError('sesseion user not found')}
        const allUsers = User.find()
        let followers = []
        allUsers.forEach((user,index) => {
            if(user.friends.includes(sessionUser.username)){
                followers.push(user)
            }
        })
        res.status(StatusCodes.OK).json(followers)
    }catch(err){
        throw new customError.BadRequestError(err) 
    }
}

module.exports = {register,login,forgotPassword,changePassword,findFriend,follow,unFollow,aroundYou,following,followers}