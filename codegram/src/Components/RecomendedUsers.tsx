import { useEffect, useState } from 'react'
import { follow_unfollow_user, getSuggestedUsers } from '../hooks/likepost'
import { MdPerson } from 'react-icons/md'

const RecomendedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([])



  useEffect(() => {
    getSuggestedUsers(setSuggestedUsers)
  }, [])

  console.log("suggestedUsers",suggestedUsers)
  return (
    <div className="hidden h-full w-[35%] bg-black text-gray-200 text-md lg:block flex-col gap-3">
      <div className="w-full h-24 text-xl p-5 text-primary flex text-center">
        recommended
      </div>
      <div className='grid w-full h-full gap-2 grid-cols-2'>
        {suggestedUsers?.map((e: any, index) => {
          return (
            <div
              className="w-full h-full flex items-center justify-center flex-col gap-3 p-5"
              key={index}
            >
              {e.profilepic ? (
                <img
                  src={e.profilepic}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className={`w-12 h-12 grid place-items-center rounded-full 
                ${index < 2 ? "bg-blue-500" : index < 3 ? "bg-accent" : index < 4 ? "bg-gray-500" : index < 6 ? "bg-pink-700" : "bg-purple-700"}`}>
                  <MdPerson className="text-4xl" />
                </div>
              )}
                <div className="">
                  {e.name}
                </div>
                <div
                  className="w-24 bg-primary h-8 grid place-items-center rounded-lg"
                  onClick={() =>
                    follow_unfollow_user(e?._id, setSuggestedUsers)
                  }
                >
                  follow
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecomendedUsers