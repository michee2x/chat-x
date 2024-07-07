import { useRef, useState, useEffect} from "react";
import {FaUpload } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import {editProfile, getloggedUser } from "../hooks/likepost";
import { MdArrowBack, MdCancel } from "react-icons/md";

const EditProfile = () => {
const [user, setUser] = useState({})
const [cp,setCp] = useState(false)
 const [editing, setEditing] = useState(false)
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputFileRef2 = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState("");
  const [file2, setFile2] = useState("");
  const [profile, setProfile] = useState<any>({
    name:"", username:"", email:"", oldPassword:"", newPassword:""
  })
const [Profilepic, setProfilePic] = useState<any>(null);
const [ProfileCover, setProfileCover] = useState<any>(null);
const [navigate, setNavigate] = useState(false);
const [res, setRes] = useState("")

useEffect(() => {
  getloggedUser(setUser)
}, [])

  const handleFileChange = (e: any) => {
    const Inputfile = e.target.files[0];
    if (Inputfile) {
      const objUrl = URL.createObjectURL(Inputfile);
      setFile(objUrl);
      console.log(objUrl);
    }
     if (Inputfile) {
       const reader = new FileReader();
       reader.onload = () => {
         setProfilePic(reader.result);
       };
       reader.readAsDataURL(Inputfile)
     }
  };
  const handleFileChange2 = (e: any) => {
    const Inputfile = e.target.files[0];
    if (Inputfile) {
      const objUrl = URL.createObjectURL(Inputfile);
      setFile2(objUrl);
      console.log(objUrl);
    }
    if (Inputfile) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileCover(reader.result);
      };
      reader.readAsDataURL(Inputfile);
    }
  };

  const handleEdit = async () => {
    setEditing(true)
   
    await editProfile(profile, Profilepic, ProfileCover, setNavigate, setRes);
  };

  if (navigate) {
   return <Navigate
      to={"/profile"}
    />;
  }
const moveBack = () => {
   history.back()
}

const values =
  file ||
  file2 ||
  profile.name ||
  profile.username ||
  profile.email ||
  profile.password ||
  profile.newPassword ||
  profile.oldPassword;

if(res){
 
setTimeout(() => {
  setRes("")
}, 3000)

}

  return (
    <div className="w-screen h-screen overflow-y-scroll bg-gray-950 lg:w-full lg:bg-black">
      <div className="w-full relative justify-between px-12 text-gray-600 h-20 flex items-center">
        <div
          className={`inline-block ${
            values ? "hidden" : "block"
          }  text-blue-500 cursor-pointer hover:text-blue-600`}
          onClick={moveBack}
        >
          <MdArrowBack className="text-2xl" />
        </div>
        <div
          className={`cursor-pointer inline-block w-16 h-6 z-100 rounded-xl ${
            values ? "block" : "hidden"
          } bottom-2 grid place-items-center left-5`}
          onClick={() => {
            setFile2("");
            setFile("");
            setProfile({
              name: "",
              username: "",
              email: "",
              oldPassword: "",
              newPassword: "",
            });
          }}
        >
          <MdCancel className="text-2xl text-blue-300" />
        </div>
        <div onClick={handleEdit}>
          <span className={`${values && "text-blue-400"} text-xl focus:text-blue-600`}>{editing && !res ? "editing" : "edit"}</span>
        </div>
      </div>
      <div className="w-full h-auto grid place-items-center text-lg mb-3 text-blue-300">
        {res}
      </div>

      <div className="flex px-10 h-auto flex-col w-full gap-3 lg:px-24 justify-center">
 <div className="border-2 rounded-xl border-blue-600 w-full h-12 grid place-items-center text-blue-600" onClick={() => setCp(prev =>  !prev)}>{cp ? "keep profile info" : "change profile info"}</div>
        <label className={`input input-bordered bg-black border-2 border-blue-600 flex items-center gap-2 lg:bg-opacity-100 ${cp ? "block" : "hidden"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 text-white opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            value={profile.name ? profile.name : user.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            type="text"
            spellCheck="false"
            className="grow text-white"
            placeholder="name"
          />
        </label>
        <label className={`input input-bordered bg-black border-2 border-blue-600 flex items-center gap-2 lg:bg-opacity-100 ${cp ? "block" : "hidden"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 text-white opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            value={profile.username ? profile.username : user.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            type="text"
            spellCheck="false"
            className="grow text-white"
            placeholder="username"
          />
        </label>
        <label className={`input input-bordered bg-black border-2 border-blue-600 flex items-center gap-2 lg:bg-opacity-100 ${cp ? "block" : "hidden"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 text-white opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            value={profile.email ? profile.email : user.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            type="email"
            className="grow text-white"
            placeholder="email"
          />
        </label>
  
        <label className={`input input-bordered bg-black border-2 border-blue-600 flex items-center gap-2 lg:bg-opacity-100 ${cp ? "block" : "hidden"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 text-white opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            value={profile.oldPassword}
            onChange={(e) =>
              setProfile({ ...profile, oldPassword: e.target.value })
            }
            type="password"
            className="grow text-white"
            placeholder="oldpassword"
          />
        </label>
        <label className={`input input-bordered bg-black border-2 border-blue-600 flex items-center gap-2 lg:bg-opacity-100 ${cp ? "block" : "hidden"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 text-white opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            value={profile.newPassword}
            onChange={(e) =>
              setProfile({ ...profile, newPassword: e.target.value })
            }
            type="password"
            className="grow text-white"
            placeholder="newpassword"
          />
        </label>
      </div>

      <div
        className="flex h-auto w-full justify-center mx-auto gap-5"
        style={{ width: "80%" }}
      >
        <div
          className="relative mt-8  rounded-2xl flex items-center justify-center flex-col
       gap-6 h-28 w-[45%] bg-black border-2 border-blue-600 cursor-pointer lg:h-56 hover:bg-gray-900"
          onClick={() => inputFileRef?.current?.click()}
        >
          {!file && (
            <div>
              <FaUpload className="text-2xl text-gray-400" />
            </div>
          )}
          {!file && <div className="text-xm font-bold">profile img</div>}
          <input
            type="file"
            accept="image/*,video/*"
            ref={inputFileRef}
            className="hidden"
            onChange={handleFileChange}
          />
          {file && (
            <img
              src={`${file}`}
              alt=""
              className="w-full rounded-2xl h-full absolute"
            />
          )}
        </div>

        {/*    ============================================================= */}

        <div
          className="relative mt-8 rounded-2xl flex items-center justify-center flex-col
       gap-6 h-28 w-[45%] bg-black border-2 border-blue-600 cursor-pointer lg:h-56 hover:bg-gray-900"
          onClick={() => inputFileRef2.current?.click()}
        >
          {!file2 && (
            <div>
              <FaUpload className="text-2xl text-gray-400" />
            </div>
          )}
          {!file2 && <div className="text-xm font-bold">cover img</div>}
          <input
            type="file"
            accept="image/*,video/*"
            ref={inputFileRef2}
            className="hidden"
            onChange={handleFileChange2}
          />
          {file2 && (
            <img
              src={`${file2}`}
              alt=""
              className="w-full rounded-2xl h-full absolute"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
