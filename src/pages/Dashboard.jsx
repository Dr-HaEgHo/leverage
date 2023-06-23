import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Render from "../components/Render";

const Dashboard = () => {
  const [page, setPage] = useState("");
  const [openNav, setOpenNav] = useState(false);

  const toggleSideBar = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="w-full h-screen flex items-center overflow-hidden ">
      {/* SIDEBAR */}
      <div
        className={`fixed z-20 ${
          openNav === true ? "left-0" : "-left-[250px] lg:left-0"
        } transition 
      duration-200 top-0 w-[250px] lg:relative lg:w-[18%] h-full`}
      >
        <Sidebar
          toggleSideBar={toggleSideBar}
          page={page}
          openNav={openNav}
          setPage={setPage}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full  lg:w-[82%] h-full">
        <Render page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default Dashboard;
