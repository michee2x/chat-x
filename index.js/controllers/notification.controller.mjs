import { Notification } from "../models/notification.model.mjs"

export const getNotifiations = async (req, res) => {
    try{
        const userId = req.user._id?.toString()
        const notification = await Notification.find({to:userId}).populate({path:"from", select:"username profilepic"})
        
        if(!notification) return res.status(400).json({message:"nonotificaton(s) found"})

        res.status(200).json({notification})
    }catch(error){
        console.log("error in notification route", error)
    }
}
export const deleteNotification = async (req, res) => {
    try{
        const {id} = req.params
        const notification = await Notification.find({_id:id})

        if(!notification || !id) return res.status(404).json({error:"notification not found"})

        await   Notification.findByIdAndDelete(id)

        res.json({message:"notification deleted successfully"})
    }catch (error) {
        console.log("error in deletenotification controller", error)
        res.status(500).json({eror:"Internal server Error.."})
    }
}