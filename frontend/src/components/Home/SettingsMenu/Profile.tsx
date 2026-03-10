import type { Dispatch, SetStateAction } from "react";
import ProfileMenu from "./ProfileMenu";
import ProfileEdit from "./ProfileEdit";

type FieldType = "text" | "email" | "number" | "select";

export type EditField = {
  type: FieldType;
  placeholder: string;
  options?: { label: string; value: string }[];
};

export type MenuOption = {
  label: string;
  onClick: () => void;
};

type Props = {
  profileView?: "menu" | "edit";
  setProfileView?: Dispatch<SetStateAction<"menu" | "edit">>;
  onBack: () => void;
  menuOptions?: MenuOption[];
  editFields?: EditField[];
  onGoToShop?: () => void;
};

export default function Profile({
  profileView = "menu",
  setProfileView,
  onBack,
  menuOptions = [],
  editFields = [],
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
          editFields={editFields}
          onGoToShop={onGoToShop}
        />
      )}
    </>
  );
}
