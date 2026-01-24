import LoadingScreen from "../../components/Loading/LoadingScreen";
import LoadingIcon from "../../assets/Loading/LoadingIcon.svg?react";

export default function LoadingPage() {
  return (
    <LoadingScreen
      Icon={LoadingIcon}
      title="CARGANDO"
      subtitle={`Esto puede tardar unos segundos.\nEstamos creando tu dieta personalizada`}
    />
  );
}
