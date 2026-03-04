import { Outlet } from "react-router-dom";

import SidebarMenu from "../../components/Home/SidebarMenu";

export default function HomeLayout() {
  return (
    <>
      <SidebarMenu />
      <Outlet />
    </>
  );
}
