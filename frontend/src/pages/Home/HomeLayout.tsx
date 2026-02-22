import { useState } from "react";
import Home from "./Home";
import SidebarMenu from "../../components/Home/SidebarMenu";
import Diet from "./Diet";

export default function HomeLayout() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex min-h-screen bg-input justify-center">
      <SidebarMenu active={active} setActive={setActive} />

      {active === 0 && <Home />}
      {active === 1 && <Diet />}
      {/* {activo === 2 && <SoonView />}
        {activo === 3 && <SoonView />}
        {activo === 4 && <SoonView />} */}
    </div>
  );
}
