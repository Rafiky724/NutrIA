import type { Dispatch, SetStateAction } from "react";
import ProfileMenu from "./ProfileMenu";
import ProfileEdit from "./ProfileEdit";

export type MenuOption = {
  label: string;
  onClick: () => void;
};

type Props = {
  profileView?: "menu" | "edit";
  setProfileView?: Dispatch<SetStateAction<"menu" | "edit">>;
  onBack: () => void;
  menuOptions?: MenuOption[];
  onGoToShop?: () => void;
};

export default function Profile({
  profileView = "menu",
  setProfileView,
  onBack,
  menuOptions = [],
  onGoToShop,
}: Props) {
  return (
    <>
      {profileView === "menu" && (
        <ProfileMenu onBack={onBack} menuOptions={menuOptions} />
      )}

      {profileView === "edit" && (
        <ProfileEdit
          onBack={() => setProfileView?.("menu")}
          onGoToShop={onGoToShop}
        />
      )}
    </>
  );
}
