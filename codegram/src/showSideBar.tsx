import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getshowSideBar } from "./hooks/likepost";
type ContextType = {
  showSideBar: boolean;
  setshowSideBar: (showSideBar: boolean) => void;
};
export const MyContext = createContext<ContextType | undefined>(undefined);

export const SideBarContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useThemeContext must be used inside the theme Provider");
  }

  return context;
};

export const ShowSideBarProvider = ({ children }: PropsWithChildren<{}>) => {
  const [showSideBar, setshowSideBar] = useState(false);
  
  return (
    <MyContext.Provider value={{ showSideBar, setshowSideBar }}>
      {children}
    </MyContext.Provider>
  );
};
