import { Outlet } from "react-router-dom";
import { Sidebar, Titlebar } from "../components/layout/admin-layout";
import { sidebarItems } from "../constants";
// import { homeOwnerNavigation } from "../../data/layout/homeOwnerNavigation";

const AdminLayout = () => {
  return (
    // <div className="flex flex-row h-screen max-w-[1980px] mx-auto overflow-hidden">
    <div className="flex flex-row h-screen w-full mx-auto overflow-hidden overflow-y-scroll bg-[#eeeeee]">
      <Sidebar sidebarItems={sidebarItems} />
      <div className="flex-1 flex flex-col">
        <div className="w-full max-w-[1440px] h-screen mx-auto">
          <Titlebar />
          <div className="flex-1 overflow-y-auto pt-10 sm:pt-0 px-2 sm:px-0">
            <div className="">{<Outlet />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
