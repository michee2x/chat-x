import User from "../models/user.model.mjs"
import bcrypt from "bcryptjs"
import cloudinary from "cloudinary"

export const getUserProfile = async (req, res) => {
    try{
        const userId = req.params.id.toString()

        const userProfile = await User.findById(userId).select("-password").populate("followers")

        if(!userProfile) return res.status(404).json({error:'usernotfound error... pls reAuthenticate'})

        res.status(200).json({message:userProfile})

    } catch (error) {
        console.log("there was an error in geetuserprofile controller", error)
        res.status(500).json({error:"Internal server error"})
    }
}
export const followers = async (req, res) => {
    try{
        const {id} = req.params
        const userid = id.toString()

        if(!id) return res.status(401).json({error:"id not found"})

        let user = await User.findById(userid)

        if(!user) return res.status(404).json({error:"user not found err"})


        if(user.followers.includes(id)){
        await User.updateOne({_id:userid}, {$pull:{followers:id}})

        } else{
            user.followers.push(userid)
        }

        
        user.save()

        res.status(200).json({message:"follow/unfollow sucessfull"})


    } catch (error){
        console.log("error in comentuser controller", error)
        res.status(500).json({error:"Internal server error"}) 
  }
}

export const follow =  async(req, res) => {
    try{
        const id = req.params.id
        
        const user = await User.findById(id)
        const loggedInUser = await User.findById(req.user._id)

        if(!user || !loggedInUser) return res.status(401).json({error:"user not found error"})

        if(!user.followers.includes(req.user._id)){
            await User.findByIdAndUpdate(user._id, {$push:{followers:req.user._id}})
        }
        else{
            console.log("you are following this user...")
            await User.findByIdAndUpdate(user._id, {$pull:{followers:req.user._id}})
        }

        if(!loggedInUser.following.includes(user._id)){
            await User.findByIdAndUpdate(req.user._id, {$push:{following:user._id}})
            return res.status(200).json({message:`you are now following ${user.name}`})
        }
        else{
            await User.findByIdAndUpdate(req.user._id, {$pull:{following:user._id}})
            return res.status(200).json({message:`you just unfollowed ${user.name}`})
        }

    }catch(error) {
        console.log("there is ana error in follow controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}
export const updateProfile = async (req, res) => {

    const {name, username, email, oldPassword, newPassword,} = req.body
    let { Profilepic, ProfileCover,} = req.body
console.log("this file is been received", name, username, email, oldPassword, newPassword)
    const loggedInUserId = req.user._id
    try{
        const user = await User.findById(loggedInUserId)
        const nameExist = await User.find({name:name})
        const usernameExist = await User.find({username:username})

        const correctPassword = await bcrypt.compare(oldPassword, user?.password || "")

        if(!user) return res.status(401).json({error:"user not found.."})

        if(nameExist.length){
            return res.status(200).json({error:"name already exist"})
        }
        if(usernameExist.length){
            return res.status(200).json({error:"username already exist"})

        }

        if(!correctPassword) return res.status(200).json({error:"old password is not correct"})

console.log("it's the to upload")

        if(Profilepic){
            if(user.profilepic){
                const userProfId = user.profilepic.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(userProfId)
            }
            const uploadedResponse = await cloudinary.uploader.upload(Profilepic)
            Profilepic = uploadedResponse.secure_url
        }
        if(ProfileCover){
            if(user.profilecover){
                const userCoverId = user.profilecover.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(userCoverId)
            }
            const uploadedResponse = await cloudinary.uploader.upload(ProfileCover)
            ProfileCover = uploadedResponse.secure_url
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        const newUser = {
            _id:user._id,
            name:name || user.name,
            username:username || user.username,
            email:email || user.email,
            password:hashedPassword || user.password,
            profilepic:profilepic || user.profilepic,
            profilecover:ProfileCover || user.profilecover,
        }
console.log(newUser)

        await User.findByIdAndUpdate(req.user._id, newUser)

        res.status(200).json({message:"update successful"})

    }catch(error){
        console.log("error i create post controller", error)
    }
}
export const suggestedUsers = async (req, res) => {
    try{
        const userId = req.user._id
        const usersfollowedbyme = await User.findById(userId).select(["following"])
        const users = await User.aggregate([
                {$match:{
                    _id: {$ne:userId}
                }
            },
                {
                    $sample:{
                        size:6
                    }
                }
        ])

        const filterOutUsersIFollow = users.filter((user) => !usersfollowedbyme.following.includes(user._id))
        const suggestedUsers = filterOutUsersIFollow
        /* const suggestedUsers = filterOutUsersIFollow.slice(0, 4) */
        res.status(200).json({suggestedUsers})

    }catch(error){
        console.log("error in suggestedUsers controllers", error)
    }
}

export const searchProfile = async (req, res) => {
    try{
        const {search} = req.body

        const foundUser = await User.find({name:{$regex:search, $options:'i'}}).populate("followers").limit(10)
        

        if(!foundUser) return res.status(404).json({message:"user not found"})
        else{
    res.status(200).json({foundUser})
    }

    }catch(error){
        console.log("error in search profile controller",error)
    }
}
