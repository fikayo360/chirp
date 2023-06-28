const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    PostImg:{
        type:String
    },
    Postauthor:{
        type:String
    },
    Posttitle:{
        type:String
    },
    Postbody:{
        type:String
    },
    url:{
        type:String
    },
    PostAuthorImg:{
        type:String
    },
    
    PostComments:[
        {
        PostId:{
            type:String
        },
        PostcommentAuthor:{
            type:String
        },
        PostcommentProfilePic:{
            type:String
        },
         PostcommentBody:{
            type:String
        }

        }
    ],
    PostLikes:[
        {
            authorName:{
                type:String
            },
            PostId:{
                type:String
            }
        }
    ]
},
{ timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema);