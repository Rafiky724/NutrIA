import type { User } from "../../types";

type Props = {
  user: User;
};

export default function NavBar({ user }: Props) {
  return (
    <>
      <nav className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl ft-bold text-brown">Hola, {user.nombre}</h1>
          <p className="text-sm ft-medium text-gray">¿Cómo va tu día?</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex gap-4">
            <div className="flex items-center gap-1">
              <img
                src="/SVG/IconsGeneral/FireStreak.svg"
                alt="Racha"
                className="w-6 h-6"
              />
              <p className="ft-bold text-2xl">{user.numero_racha}</p>
            </div>
            <div className="flex items-center gap-1">
              <img
                src="/SVG/IconsGeneral/GemsIcon.svg"
                alt="Gemas"
                className="w-6 h-6"
              />
              <p className="ft-bold text-2xl">{user.cantidad_gemas}</p>
            </div>
          </div>

          <img
            src="/Background/LogoIcono.png"
            alt="Usuario"
            className="w-12 h-12"
          />
        </div>
      </nav>
    </>
  );
}
