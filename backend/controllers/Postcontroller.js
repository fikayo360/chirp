const Post = require('../models/Post')
const User = require('../models/User')
const customError = require('../errors')
const { StatusCodes } = require('http-status-codes')


const publishPost = async(req,res) => {
    const {postImg,postAuthor,postTitle,postBody} = req.body
    try{
        const sessionUser = await User.findOne({username:req.user.username})
        if(!sessionUser){throw new customError.NotFoundError('sesseion user not found')}
        const newPost = await Post.create({userId:sessionUser._id,postImg,postAuthor,postTitle,postBody})
        res.status(StatusCodes.OK).json('post created ')
    }catch(err){
        throw new customError.BadRequestError(err)
    }
}

const getFriendsPost = async(req,res) => {
    try{
        const sessionUser = await User.findOne({username:req.user.username})
        console.log(sessionUser);
        if(!sessionUser){throw new customError.NotFoundError('sesseion user not found')}
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const posts = await Promise.all(
            sessionUser.friends.map(async (user) => {
                let friendProfile = await User.findOne({username: user})
                const todaysPosts = await Post.find({
                    $and: [
                      { userId: friendProfile._id },
                      { createdAt: { $gte: today } }
                    ]
                  });
                return [...todaysPosts]
            })
        )
        res.status(StatusCodes.OK).json(posts)
    }
       catch(err){
        throw new customError.BadRequestError(err)
    }
}

const commentPost = async(req,res) => {
    try{
        const {PostId,PostcommentAuthor,PostcommentBody,PostcommentProfilePic} = req.body
        let newComment = {PostId,PostcommentAuthor,PostcommentProfilePic,PostcommentBody}
        let currentPost = Post.findById(PostId)
        currentPost.PostComments.shift(newComment)
        currentPost.save()
        res.status(StatusCodes.OK).json('comment added succesfully')
    }catch(err){
        throw new customError.BadRequestError(err)
    }
}

const likePost = async(req,res) => {
    try{
        const {authorName,postId} = req.body
        let newlike = {authorName,postId}
        let currentPost = Post.findById(postId)
        currentPost.PostLikes.map(item => {
            if(item.authorName === newlike.authorName ){
                throw new customError.BadRequestError('already liked post')
            }
    })
        currentPost.PostLikes.push(newlike)
        currentPost.save()
        res.status(StatusCodes.OK).json('like added succesfully')
    }catch(err){       
        throw new customError.BadRequestError(err)
    }
}



module.exports = {publishPost,getFriendsPost,commentPost,likePost}