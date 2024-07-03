
export  const fetchData = async (setPost:any, setLoading:any=true, page:number=1) => {
      try{
        const res = await fetch(`https://chat-x-backend.onrender.com/api/post/getposts?page=${page}`,{
          credentials:'include'
        }) 
        const data = await res.json()
        
        if(!data) throw new Error(`there was an error : ${data}`)

        console.log( data.message)

        await setPost((prev:any) => [...prev, ...data.message])
        await setLoading(false)
        if(data){
          return data.message
        }

      }catch(error) {
        console.log(error)
      }
    }