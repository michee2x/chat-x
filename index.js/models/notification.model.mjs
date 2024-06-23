import mongoose from 'mongoose'

const notificationSchema = mongoose.Schema({
    from:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    to:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:["like","follow"]
    }

}, {timestamps:true})

export const Notification = mongoose.model("Notification", notificationSchema)

