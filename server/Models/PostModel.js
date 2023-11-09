import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    userId:{type:String , require:true},
    desc:String,
    username:String,
    firstname:String,
    lastname:String,
    likes:[],
    comment:[],
    createdAt: {
        type: Date,
        default: new Date(),
      },
    image: String,
    profilePicture:String,
},
{
    timestamps:true
});
var PostModel=mongoose.model("Posts",postSchema)
export default PostModel