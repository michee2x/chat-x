import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    text:{
        type:String,
        default:""
    },
    file:{
        type:String,
        default:""
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            default:[],
            ref:"User"
        }
    ],
    Comments:[
        {
            text:{
                type:String,
                default:""
            },
            file:{
                type:String,
            },
            userid:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            }
        }
    ],
    bookmark:[
        {
            type:mongoose.Schema.Types.ObjectId,
            default:[],
            ref:"User"
        }
    ]
}, {timestamps:true})

const Posts  = mongoose.model("Post", postSchema)

export default  Posts