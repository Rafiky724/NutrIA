import { useState } from "react";
import Home from "./Home";
import SidebarMenu from "../../components/Home/SidebarMenu";
import Diet from "./Diet";
import Pantry from "./Pantry";
import Config from "./Config";

export default function HomeLayout() {
  const [active, setActive] = useState(0);

  return (
    <>
      <SidebarMenu active={active} setActive={setActive} />

      {active === 0 && <Home />}
      {active === 1 && <Pantry />}
      {active === 2 && <Diet />}
      {active === 3 && <Config />}
    </>
  );
}
