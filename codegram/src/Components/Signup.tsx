import { useState } from "react";
import {MdError } from "react-icons/md";
import { Link , Navigate} from "react-router-dom";

type logError = {
  type?: String;
  message?:String
};

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState<logError>({});
  const [loading, setLoading] = useState(false);
  const [navigate, setNavigate] = useState(false)

  const Signup = async (e: any) => {
    setLoading(true)
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://chat-x-backend.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
        credentials:"include"
      });

      const data = await res.json();
      if (!data) throw new Error("invalid credentials...");
      if (data?.error){
        setError(data?.error)
        setLoading(false)
          setTimeout(() => {
            setError({});
          }, 2000);
      }
      if(!data?.error){
        setLoading(true)
        confirm("signIn successful")
        setNavigate(true)
      }

      console.log(data);

      localStorage.setItem("loggedUser", JSON.stringify(data));
      /* setLoggedUser(data); */
    } catch (error) {
      console.log(error)
    }
  };
  
  if(navigate){
    return <Navigate to={"/login"} />
  }
  const Skeletons = () => {
    return <span className="loading loading-spinner loading-sm"></span>;
  };

  return (
    <div className="w-screen font-mono h-screen lg:flex">
      <div className="w-full flex bg-black h-full lg:w-1/2">
        <div className="relative w-full h-full bg-black border-primary mx-auto">
          <div className="camera"></div>
          <div className="display bg-black w-full h-full">
            <div className="w-full h-full bg-cover absolute lg:hidden">
              <img
                src="https://stock.adobe.com/ng/images/abstract-composition/81746829"
                alt=""
                className="w-full h-full bg-contain bg-opacity-90"
              />
            </div>
            <form
              onSubmit={Signup}
              className="w-screen bg-blue-800 bg-opacity-90 h-screen justify-center items-center pt-16 relative flex flex-col gap-5 lg:w-full lg:h-full"
            >
              <h2 className="card-title text-blue-400 absolute top-10">
                <i>Sign In to Chat X</i>
              </h2>
              <span
                className={`absolute top-32 flex ${
                  error?.type ? "block" : "hidden"
                } items-center gap-3 text-blue-300 text-lg lg:top-28`}
              >
                <MdError />{" "}
                {error?.type === "existingUser"
                  ? "User Already Exist"
                  : error?.type === "existingEmail"
                  ? "Email Already Exist"
                  : ""}
              </span>
              <label className="input input-bordered bg-opacity-90 flex items-center gap-2 lg:bg-opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="grow"
                  placeholder="name"
                />
              </label>
              <label className="input input-bordered bg-opacity-90 flex items-center gap-2 lg:bg-opacity-100">
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
              <label className="input input-bordered bg-opacity-90 flex items-center gap-2 lg:bg-opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  value={email}
                  autoComplete="true"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="grow"
                  placeholder="email"
                />
              </label>
              <label className="input input-bordered bg-opacity-90 flex items-center gap-2 lg:bg-opacity-100">
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
                <Link to={"/login"} className="no-underline text-white">
                  Already have an Account? Login
                </Link>
              </div>
              <button
                style={{ width: "55%" }}
                className=" rounded-3xl text-white bg-blue-500 outline-0 border-0 absolute bottom-10 justify-center flex items-center gap-2 hover:bg-blue-700 focus:outline-none"
                onClick={Signup}
              >
                <span
                  className={`flex ${
                    loading ? "block" : "hidden"
                  } items-center gap-3`}
                >
                  signing...
                  <Skeletons />
                </span>
                <span className={`${loading ? "hidden" : "block"}`}>
                  Sign In
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* SECOND SECTION */}
      <div className="mainer relative bg-gray-900 h-full w-1/2 hidden md:block">
        <div className="w-full h-full bg-cover absolute">
          <img
            src="../public/4WExuiHK5CQxYbuNwgjW9UStDrWblt3BmlMV.png"
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
          <p>fully configured some real world complex processes such as high security</p>
          <p>make sure that confidential information are not disclosed</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;


{
  /* <span className="loading loading-ball loading-lg"></span> 
    <span className="loading loading-spinner loading-lg"></span>
*/
}
