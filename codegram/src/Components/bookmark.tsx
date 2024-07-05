import { useEffect, useState } from 'react'
import PostComponent from './postComponent'
import { bookmark, getloggedUser} from '../hooks/likepost'
import {MdBookmark, MdMenu } from 'react-icons/md'
import ParPost from "./Post";
import { SideBarContext } from "../showSideBar";

const BookMark = () => {
  const {setshowSideBar } = SideBarContext();
const [parPost, setParPost] = useState<any>({})
    const [bookMark, setbookmark] = useState([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>([]);
    const [noBookmark, setNoBookMark] = useState(false)

    useEffect(() => {
        bookmark(setbookmark, setNoBookMark)
        setLoading(false)
        getloggedUser(setUser);
        
    }, [])

  return (
<>
    <div className={`w-screen ${Object.keys(parPost).length === 0 ? "block" : "hidden"} h-screen bg-black overflow-y-scroll lg:w-full`}>
      <div className="w-full px-3 h-12 flex justify-between items-center bg-gray-900">
        <MdMenu className="text-2xl text-white" onClick={() => setshowSideBar(true)} />
        <span className="flex items-center w-auto h-full justify-between text-blue-500 gap-3">
          {" "}
          <MdBookmark /> Bookmark
        </span>
      </div>
      {loading ? (
        <div className='w-full h-full grid items-center justify-center'>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <ul
            className={`flex ${
              noBookmark ? "hidden" : "block"
            } mt-10 wrap w-full h-full flex-col pb-96 gap-3 overflow-y-scroll`}
            style={{
              scrollbarWidth: "thin",
              msScrollbarTrackColor: "red",
            }}
          >
            {bookMark.map((e: any, index) => {
              return (
                <PostComponent
                  e={e}
                  index={index}
                  setPost={setbookmark}
                  setParPost={setParPost} 
                  setLoading={setLoading}
                  from={"bookmark"}
                  user={user}
                  post={bookMark}
                />
              );
            })}
          </ul>
          <div
            className={`w-full ${
              noBookmark ? "block" : "hidden"
            } h-full grid place-items-center text-xl text-primary-content`}
          >
            there are no bookmarks
          </div>
        </>
      )}
    </div>
    <div className={`w-screen ${Object.keys(parPost).length === 0 ? "hidden" : "block"} h-screen`}>
<ParPost setParPost={setParPost} parPost={parPost} id={parPost?._id} from={"home"}/>
</div>
 </> );
}

export default BookMark
