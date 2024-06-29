import Posts from "../models/post.model.mjs"
import User from "../models/user.model.mjs"
import { Notification } from "../models/notification.model.mjs"
import cloudinary from "cloudinary"
import fs from "fs"


export const createPost = async (req, res) => {
    try{
        const text = req.body.text
        const path = req.file.path
        let file = req.file
        const  user = req.user
        if (!user) return res.status(404).json({error:"user not found err"})

        const foundPost = await Posts.find({user:user._id})

        
        if(file.mimetype === "video/mp4"){
            
         const res = await  cloudinary.v2.uploader.upload(req.file?.path, { resource_type: "video",eager: [
      { width: 100, height: 100, crop: "pad", audio_codec: "none" }, 
      { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
    eager_async: true,
    eager_notification_url: "https://mysite.example.com/notify_endpoint" })
    
            file = res.secure_url
            console.log("thi sis the uploaded respnse for the video", res.secure_url)
        }
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            const byteArrayBuffer = fs.readFileSync(req.file?.path);
            const uploadResult = await new Promise((resolve) => {
            cloudinary.v2.uploader.upload_stream({ transformation: { width: 350, height:350,crop: "fill" }},(error, uploadResult) => {
            return resolve(uploadResult);
            }).end(byteArrayBuffer);
        });

        file = uploadResult.secure_url

        if(uploadResult.secure_url){
            fs.unlink(path, (err) => {
            if(err){
                console.log("this was a problem deleting file")
            }
        })
        }
        }

        const newPost  =  new Posts({
            user:req.user._id.toString(),
            text,
            file:req.file === undefined ? "" : file
        })

        await  newPost.save()

        res.status(200).json(newPost)


    }catch (error){
        console.log("error in post controller", error)
        res. status(500).json({error:"Internal server error..."})
    }
}

export const DeletePost = async (req, res) => {
    try{
        const {id} = req.params
        const post = await Posts.findById(id)
        
        if(!post) return res.status(404).json({error:"post not found"})

        if(post){

          const id = post?.file.split("/").pop().split(".")[0]
          console.log("this file is being deleted", id)
          await cloudinary.uploader.destroy(id)
          
          const comments = post.Comments
        if(comments){
            for(const comment of comments){
                const fileId = comment?.file?.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(fileId) 
            }
        }
          

            
          
        }
        

        await Posts.findByIdAndDelete(id)

        res.json({message:"post deleted successfully"})
    }catch (error) {
        console.log("error in deletepost controller", error)
        res.status(500).json({eror:"Internal server Error.."})
    }
}

export const CommentPost = async (req, res) => {
    try{
        const {id} = req.params
        const postid = id.toString()
        const {text} = req.body
        let {serverFile:file} = req.body
        const userid = req.user._id

        if((!text || !file) && ! id) return res.status(401).json({error:"pls send a post"})

        const post = await Posts.findById(postid)

        if(!post) return res.status(404).json({error:"Post no found err"})

        if(file){
            const uploadedResponse = await cloudinary.uploader.upload(file)
            file = uploadedResponse.secure_url
        }

        const comment = {
           text, file, userid
        }

        await Posts.updateOne({_id:postid}, {$push:{Comments:comment}})

        await res.status(200).json({message:post})


    } catch (error){
        console.log("error in comentPost controller", error)
        res.status(500).json({error:"Internal server error"}) 
  }
}
export const likeunlikepost =  async(req, res) => {
    try{
        const {id} = req.params
        const postid = id.toString()
        
        const post = await Posts.findById(postid)
        const loggedInUser = await User.findById(req.user._id)
        const postUser = await User.findById(post.user)

        if(!post || !loggedInUser) return res.status(401).json({error:"post not found error"})

        

        if(!post.likes.includes(req.user._id)){
            await Posts.findByIdAndUpdate(post._id, {$push:{likes:req.user._id}})
            const notification = {
                from:req.user._id, to:postUser._id, type:"like"
            }

            const newNotification = new Notification(notification)
            await newNotification.save()
            return res.status(200).json({message:`you just liked ${postUser.name}'s post`})
        }
        else{
            await Posts.findByIdAndUpdate(post._id, {$pull:{likes:req.user._id}})
            
            return res.status(200).json({message:`you just unliked ${postUser.name}'s post`})
        }

    }catch(error) {
        console.log("there is ana error in likeunlike controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const getAllPost = async(req, res) => {
    let {page} = req.query
    page = parseInt(page) || 1
    const skip = (page - 1) * 5
    try{
        const posts = await Posts.find().skip(skip).limit(5).sort({createdAt:-1}).populate({path:"user", select:"-password"}, ).
populate({path:"Comments.userid"})
        if(!posts) return res.status(404).json({error:"Error Loading post..."})

        if(posts === 0) return res.status(200).json({message:[]})

        res.status(200).json({message: posts})
    } catch (error) {
        console.log("error in getAll post route", error)
        res.status(500).json({error:"Internal server error"})
    }
}

export const getUserPost = async (req, res) => {
    try{
        const id = req.params.id.toString()

        const userPost = await Posts.find({user:id}).sort({createdAt: -1}).populate({path:"user"})
        .populate({path:"Comments.userid"})

        if(!userPost) return res.status(404).json({error:"userpost not found..."})

        res.status(200).json(userPost)

    } catch (error){
        console.log("error in getAll post route", error)
        res.status(500).json({error:"Internal server error"})
    }
}
export const getPost = async (req, res) => {
    try{
        const id = req.params.id.toString()

        const userPost = await Posts.findById(id).populate({path:"user"})
        .populate({path:"Comments.userid"})

        if(!userPost) return res.status(404).json({error:"userpost not found..."})

        res.status(200).json(userPost)

    } catch (error){
        console.log("error in getAll post route", error)
        res.status(500).json({error:"Internal server error"})
    }
}
export const fetchFollowing = async (req, res) => {
    try{
        const userid = req.user._id
        const user = await User.findById(userid)

        if(!user) return res.status(400).json({error:"user not found error..."})

        const following = user.following;
        const feedPost = await Posts.find({user:{$in:following}}).sort({createAt: -1}).populate({path:"user", select:"-password"})
        
        if(!feedPost) return res.status(404).json({message:"no post found of the current users you follow"})

        res.status(200).json(feedPost)
    } catch(error){
        console.log("error in fetchFollowing controller", error)
    }
}
export const bookMarkPost = async (req, res) => {
    try{

        const {id} = req.params
        const loggedInUserId = req.user._id

        const Post = await Posts.findById(id)
        const loggedInUser = await User.findById(loggedInUserId)

        if(Post.bookmark?.includes(loggedInUserId)){
            await Posts.findByIdAndUpdate(id, {$pull:{bookmark:loggedInUserId}})
        }else{
            await Posts.findByIdAndUpdate(id, {$push:{bookmark:loggedInUserId}})
        }
        if(loggedInUser.bookmark?.includes(id)){
            await User.findByIdAndUpdate(loggedInUserId, {$pull:{bookmark:id}})
        }else{
            await User.findByIdAndUpdate(loggedInUserId, {$push:{bookmark:id}})
        }

        const post = await Posts.findById(id)
        const bookmarks = post.bookmark?.length

        res.status(200).json({bookmarks})

    }catch(error){
        console.log("error in bookmark constroller", error)
    }
}
export const getBookMark = async (req, res) => {
    try{
        const user = await User.findById(req.user._id)
        const bookmarks = user.bookmark
        if(!bookmarks){
            return res.status(200).json({message:"no bookmarks"})
        }
        const bookMarkPost = await Posts.find({_id:{$in:bookmarks}}).populate("user")
        if(!bookMarkPost){
            return res.status(404).json({message:[]})
        }

        res.status(200).json(bookMarkPost)

    }catch(error){
        console.log("error in getBookMark controller", error)
    }
}