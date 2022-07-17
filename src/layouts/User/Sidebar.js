import { useContext, useEffect, useState } from "react";
import { UIContext } from "../../context/UIState/UIContext";
import Backdrop from "../../components/UI/Backdrop";
import SidebarList from "../../components/SidebarList";
import { IconContext } from "react-icons/lib";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

function Sidebar(props) {
  const { activeMenu, setActiveMenu, screenSize, setScreenSize } =
    useContext(UIContext);
  const [loading, setLoading] = useState(true);
  const [sidebarData, setSidebarData] = useState([]);
  useEffect(() => {
    axios
      .get("/categories", {
        params: {
          flag: "nested",
        },
      })
      .then((data) => {
        setLoading(false);
        setSidebarData(data.data.data);
      });
  }, []);

  useEffect(() => {
    console.log(sidebarData);
  }, [sidebarData]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize >= "900") setActiveMenu(true);
  }, [screenSize]);

  return (
    <>
      {activeMenu && (
        <Backdrop
          onClick={() => {
            setActiveMenu(false);
          }}
          className={`${screenSize > 900 ? "hidden" : ""}`}
        />
      )}
      <aside
        className={`fixed top-0 h-screen w-60 bg-gray-100 shadow-sidebar dark:shadow-none ${
          screenSize < 900 ? "z-10 duration-300" : ""
        } dark:bg-[#3d3d3d]   ${screenSize > 900 ? "mt-12 " : ""} ${
          activeMenu ? "translate-x-0" : "translate-x-60"
        }`}
      >
        {/* <!--===== TOP =====--> */}

        <Link
          to={"/"}
          className={`block select-none items-center  justify-center  py-2 pr-8 ${
            screenSize > 900
              ? " hidden"
              : " border-b-[0.5px] border-b-gray-400 border-opacity-20"
          }`}
        >
          لوگو شرکت
        </Link>

        {/* <!--===== MAIN =====--> */}
        <IconContext.Provider value={{ size: "22px" }}>
          <div className={` ${screenSize > 900 ? "pt-3" : "pt-4"}`}>
            <SidebarList items={null} />
          </div>
          <div className={` mt-10`}>
            <h1 className="mb-4 px-6 text-lg">سرویس ها</h1>
            {loading && (
              <SkeletonTheme baseColor="#333" highlightColor="#444">
                <Skeleton
                  count={2}
                  direction="rtl"
                  inline
                  className="mb-6 mr-4 h-4 w-full "
                  width={"80%"}
                />
              </SkeletonTheme>
            )}
            <SidebarList items={sidebarData} />
          </div>
        </IconContext.Provider>
      </aside>
    </>
  );
}

export default Sidebar;
