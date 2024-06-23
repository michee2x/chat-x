import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    profilepic:{
        type:String,
        default:""
    },
    profilecover:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    link:{
        type:String,
        default:""
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],
    bookmark:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Posts",
            default:[]
        }
    ]
}, {timestamps:true})

const  User = mongoose.model("User", userSchema)

export default User