import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {useState } from "react";
import {MdError} from "react-icons/md";
import { Link, Navigate } from "react-router-dom";

type logError = {
  type?:String
}

const Login = () => {
/*   const {loggedUser, setLoggedUser} = AuthContext() */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<logError>({});
  const [navigate, setNavigate] = useState(false)
  const [loading, setLoading] = useState(false)

const handleSumbit = async (e:any) => {
  setLoading(true)
  let data:any;
  e.preventDefault()
 const  fetchData = async() => {
    try {
      const res = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials:"include"
      });

      data = await res.json()

      if(data?.error){
        setError(data?.error)
        setLoading(false)
        console.log(data?.error)
      }

      if(!data?.error){
        setNavigate(true)
      }

      localStorage.setItem("userId", JSON.stringify(data))
    } catch (error:any) {
      console.log(error);
    }
  }
  await fetchData()
  }

if(navigate){
  return <Navigate to={"/"}/>
}

const Skeletons = () => {
  return <span className="loading loading-spinner loading-sm"></span>;
};

  return (
    <div className="w-screen z-50 h-screen lg:flex">
      <div className="w-full font-mono flex bg-blue-900 h-full lg:w-1/2">
        <div className="relative w-full h-full bg-gray-900 border-primary mx-auto">
          <div className="camera absolute"></div>
          <div className="display bg-blue-950 w-full h-full">
            <form
              onSubmit={handleSumbit}
              className="w-screen h-screen justify-center items-center pt-16 relative flex flex-col gap-5 lg:w-full lg:h-full"
            >
              <h2 className="card-title text-blue-400 absolute top-10">
                <i>Login to Chat X</i>
              </h2>
              <span
                className={`absolute top-64 flex ${
                  error?.type ? "block" : "hidden"
                } items-center gap-3 text-red-700 lg:top-36`}
              >
                <MdError />{" "}
                {error.type === "nameError" ? "username" : "password"} not found
                in DataBase...
              </span>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="grow"
                  placeholder="Username"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  value={password}
                  autoComplete="true"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="grow"
                  placeholder="password"
                />
              </label>

              <div className="w-full button2 h-10 mb-6 grid place-items-center py-4">
                <Link to={"/signup"} className="no-underline">
                  Don't have an account? signin
                </Link>
              </div>
              <button
                style={{ width: "55%" }}
                className=" rounded-3xl text-white bg-blue-800 outline-0 border-0 absolute bottom-10 justify-center flex items-center gap-2 hover:bg-blue-700 focus:outline-none"
                onClick={handleSumbit}
              >
                <span
                  className={`flex ${
                    loading ? "block" : "hidden"
                  } items-center gap-3`}
                >
                  logging...
                  <Skeletons />
                </span>
                <span className={`${loading ? "hidden" : "block"}`}>
                  Log In
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* SECOND SECTION */}
      <div className="mainer relative bg-blue-900 h-full w-1/2 hidden md:block">
        <div className="w-full h-full bg-cover absolute">
          <img
            src="../public/h3xW3vd0UIOG8rOr5t2eo9hksiEvjmkzYpm8.png"
            alt=""
            className="w-full h-full bg-cover bg-opacity-40"
          />
        </div>
        <div className="absolute w-full h-auto flex justify-center z-10">
          <h1 className="text-blue-300 font-mono m-4">
            Welcome To <i className="text-blue-500">Chat X</i>
          </h1>
        </div>
        <div className="absolute bottom-3 font-mono w-full h-auto grid place-items-center text-sm text-white ">
          <p>this application is still in development mode and have not </p>
          <p>fully configured some real world complex processes</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
