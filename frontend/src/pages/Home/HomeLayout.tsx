import { useState } from "react";
import Home from "./Home";
import SidebarMenu from "../../components/Home/SidebarMenu";
import Diet from "./Diet";

export default function HomeLayout() {
  const [active, setActive] = useState(0);

  return (
    <>
      <SidebarMenu active={active} setActive={setActive} />

      {active === 0 && <Home />}
      {active === 1 && <Diet />}
      {active === 2 && <Diet />}
      {active === 3 && <Diet />}
      {active === 4 && <Diet />}
    </>
  );
}
