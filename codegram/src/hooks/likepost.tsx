
import { fetchData } from "../fetchData";

export const likeUnlike = async (postId: string, setPost: any, userId:any="", fetchPosts:boolean, setLike:any) => {
  try {
    setLike(true)
    const res = await fetch(
      `https://chat-x-backend.onrender.com/api/post/likepost/${postId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (!res.ok) throw new Error("there was an error...");
    console.log("should i fetch all the posts",fetchPosts);
    if(fetchPosts){
      await fetchData(setPost);
    }
    if(!fetchPosts){
      await getuserpost(userId, setPost);
    }
    setLike(false)
    
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};

export const createpost = async (file: any, setNavigate: any) => {
  try {
    const res = await fetch("https://chat-x-backend.onrender.com/api/post/createpost", {
      method: "POST",
      body: file,
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");

    const data = await res.json();
    if(data){
      await setNavigate(true);
    }
    console.log(data);
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};

export const deletepost = async (id: string) => {
  try {
    const res = await fetch(`https://chat-x-backend.onrender.com/api/post/deletepost/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};

export const commentpost = async (
  text: string,
  serverFile: any,
  postId: string,
  setPost: any,
  setComments: any
) => {
  console.log("this is te comment", postId)
  try {
    const res = await fetch(
      `https://chat-x-backend.onrender.com/api/post/commentPost/${postId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          serverFile,
        }),
        credentials: "include",
      }
    );
    if (!res) throw new Error("there was an error...");

    const data = await res.json();
    console.log(data);
    await getpost(postId, setPost, setComments);
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};

export const getuserpost = async (id: any, setPost: any) => {
  try {
    console.log("this is the iddddssaa", id)
    const url = `https://chat-x-backend.onrender.com/api/post/getuserposts/${id}`;
    console.log("in getuserpost hook", id);
    const res = await fetch(url, {
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");

    const data = await res.json();
    const mapped = data.map((e:any) => e)
    await setPost(mapped);
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};
export const getpost = async (id: any, setPost: any, setComments: any) => {
  try {
    const url = `https://chat-x-backend.onrender.com/api/post/getpost/${id}`;
    console.log("in getuserpost hook", id);
    const res = await fetch(url, {
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");

    const data = await res.json();
    await setPost(data);
    await setComments(data.Comments);
    console.log(data.Comments);
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};

export const getSuggestedUsers = async (setSuggestedUsers: any) => {
  try {
    const url = `https://chat-x-backend.onrender.com/api/user/suggestedusers`;
    const res = await fetch(url, {
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");

    const data = await res.json();
    setSuggestedUsers(data.suggestedUsers);
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};

export const logOut = async () => {
  try {
    const url = `https://chat-x-backend.onrender.com/api/auth/logout`;
    const res = await fetch(url, {
      method:"POST",
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");
   localStorage.removeItem('userId')
      
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};
export const getloggedUser = async (setMainUser:any) => {
  const data = localStorage.getItem("userId");
  const id = data && JSON.parse(data);
  console.log("this is the id", id.loggedUser._id);
  try {
    const url = `https://chat-x-backend.onrender.com/api/user/userprofile/${id.loggedUser._id}`;
    const res = await fetch(url, {
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");

    const data = await res.json();
    await setMainUser(data?.message)
    
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};
export const follow_unfollow_user = async (id: any, setSuggestedUsers: any = []) => {
  try {
    const res = await fetch(`https://chat-x-backend.onrender.com/api/user/follow/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");

    setSuggestedUsers && await getSuggestedUsers(setSuggestedUsers)
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};

export const getUserProfile = async (id: any, setUser: any) => {
  try {
    const url = `https://chat-x-backend.onrender.com/api/user/userprofile/${id}`;
    const res = await fetch(url, {
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");

    const data = await res.json();
    console.log("logged in userrrrrrrrrrrr", data)
    await setUser(data);
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};
export const getProfile = async (
  search: string,
  setUser: any = [],
  setPost:any = []
) => {
  try {
    const url = `https://chat-x-backend.onrender.com/api/user/searchprofile`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        search,
      }),
    });
    if (!res) throw new Error("there was an error...");

    const data = await res.json();
    const userId = data.foundUser[0]._id;
    console.log("this is the user profile",data?.foundUser )
    await setUser(data?.foundUser);
    await getuserpost(userId, setPost);
    
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};
export const editProfile = async (
  profile:any,
  Profilepic:any,
  ProfileCover:any,
  setNavigate:any,
  setRes:any
) => {
  try {
    const url = `https://chat-x-backend.onrender.com/api/user/updateProfile`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...profile, Profilepic, ProfileCover
      }),
    });
    if (!res.ok) throw new Error("there was an error...");
    const data = await res.json()
    if(!data.error){
      await setNavigate(true)
    }
    if(data.error){
        setRes(data.error)
    }
  } catch (error) {
    console.log("error in editProfile", error);
  }
};

export const getnotifications = async (setNotifications: any) => {
  try {
    const url = `https://chat-x-backend.onrender.com/api/notification/getnotification`;
    const res = await fetch(url, {
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");

    const data = await res.json();
    await setNotifications(data.notification);
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};
export const deletenotification = async (setNotification:any, id:string) => {
  try {
    const url = `https://chat-x-backend.onrender.com/api/notification/deletenotification/${id}`;
    const res = await fetch(url, {
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");

    const data = await res.json();
    console.log("data in deletenotification hook", data)
    getnotifications(setNotification)
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};
export const deleteUserPost = async (id:string) => {
  try {
    const url = `https://chat-x-backend.onrender.com/api/post/deletepost/${id}`;
    const res = await fetch(url, {
      method:"POST",
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");

    const data = await res.json();

    if(data){
      alert("post deleted successfully")
    }
    

  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};
export const getFollowingPost = async (setPost:any, setLoading:any) => {
  try {
    const url = `https://chat-x-backend.onrender.com/api/post/getfollowingposts`;
    const res = await fetch(url, {
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");

    if(res.ok){
      const data = await res.json();
      await setPost(data)
      await setLoading(false)
    }
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};
export const bookMark = async (id:string, setPost:any, setBookMarking:any) => {
  try {
    setBookMarking(true)
    const url = `https://chat-x-backend.onrender.com/api/post/bookmark/${id}`;
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res) throw new Error("there was an error...");

    const data = await res.json();
    console.log("this is the bookmark", data)
    await fetchData(setPost);
    setBookMarking(false)
  } catch (error) {
    console.log("error in likeUnlike", error);
  }
};
export const bookmark = async (setbookmark:any, setNoBookMark:any) => {
  try {
    const url = "https://chat-x-backend.onrender.com/api/post/getbookmarks";
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("there was an error while getting bookmarks");
    }

    const data = await res.json();
    console.log("this is are the bookmarks", data.length);
    if (data.length === 0) {
      setNoBookMark(true);
    } else {
      setbookmark(data);
    }

  } catch (error) {
    console.log("this is the error in bookmark component", error);
  }
};
