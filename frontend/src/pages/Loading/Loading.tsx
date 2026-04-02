import LoadingScreen from "../../components/Loading/LoadingScreen";

export default function LoadingPage() {
  return (
    <LoadingScreen
      title="CARGANDO"
      subtitle={`Esto puede tardar unos segundos.\nEstamos creando tu dieta personalizada.`}
    />
  );
}
