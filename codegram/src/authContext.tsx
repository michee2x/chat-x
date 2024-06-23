import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getloggedUser } from "./hooks/likepost";
type ContextType = {
  loggedUser: any;
  setLoggedUser: (theme: any) => void;
};
export const MyContext = createContext<ContextType | undefined>(undefined);

export const AuthContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useThemeContext must be used inside the theme Provider");
  }

  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {

  const [loggedUser, setLoggedUser] = useState({});
 /*  useEffect(() => {
   const loggeduser = JSON.parse(localStorage.getItem("userId")!);
   setLoggedUser(loggeduser)
  }, []) */
console.log("loogeddddiddd",loggedUser)
  return (
    <MyContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </MyContext.Provider>
  );
};

