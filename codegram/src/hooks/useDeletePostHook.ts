import { Navigate, useNavigate } from "react-router-dom"
import { fetchData } from "../fetchData"
import { deleteUserPost } from "./likepost"

export const deletePost = async (id:string,setPost:any, setLoading:any) => {
   const deletePost =  confirm(`you are about to delete your post`)

   if(deletePost){
    await deleteUserPost(id)
    await fetchData(setPost, setLoading)
   }
}
