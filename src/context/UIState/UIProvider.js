import { useState } from "react";
import { UIContext } from "./UIContext";



const UIProvider = (props) => {
  const [currentTheme, setCurrentTheme] = useState("Light");
  const [activeMenu, setActiveMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const [openLogin, setOpenLogin] = useState(false);
  return (
    <UIContext.Provider
      value={{
        activeMenu,
        currentTheme,
        screenSize,
        openLogin,
        setScreenSize,
        setCurrentTheme,
        setActiveMenu,
        setOpenLogin,
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
};

export default UIProvider;