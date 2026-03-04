import { Link } from "react-router-dom";
import NavBar from "../../components/Home/NavBar";
import { useEffect, useState } from "react";
import type { HomeResponse } from "../../types";
import { HomeService } from "../../services/homeService";

export default function AboutMe() {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await HomeService.getHome();
        setHomeData(data);
      } catch (err) {
        console.error("Error al cargar datos del home", err);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <>
      <div className="flex min-h-screen bg-input pl-0 md:pl-20 pr-0 md:pr-10">
        <div className="flex-1 py-6 flex flex-col gap-6">
          {/* NavBar */}
          <div className="block md:hidden">
            <NavBar
              user={homeData?.usuario}
              title="Sobre nosotros"
              subtitle="Contáctanos"
            />
          </div>
          <div className="hidden md:block">
            <NavBar
              user={homeData?.usuario}
              title="Sobre nosotros"
              subtitle="Aquí puedes conocernos un poco más o contactarnos"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center mt-10 md:mt-5 xl:mt-0 xl:h-180">
            <div className="flex items-center justify-center">
              <div className="flex flex-col bg-white w-2xs lg:w-sm xl:w-lg p-8 rounded-3xl shadow-lg text-left ml-10 md:ml-0 max-h-[680px] overflow-y-auto gap-6 relative">
                <Link
                  to={"/config"}
                  className="absolute top-6 left-6 flex items-center gap-2 cursor-pointer hover:scale-105 transition"
                >
                  <img
                    src="/SVG/IconsGeneral/ArrowOptionIcon.svg"
                    alt="volver"
                    className="w-4 h-4 rotate-180"
                  />
                  <span className="ft-medium text-sm">Volver</span>
                </Link>

                <div className="mt-8 flex flex-col gap-6">
                  <div>
                    <h2 className="ft-bold text-md mb-0 xl:mb-2 text-brown">
                      Estamos contigo
                    </h2>
                    <p className="ft-light text-sm mb-2 text-justify">
                      Somos un equipo apasionado por la nutrición personalizada
                      y la tecnología aplicada al bienestar. Nuestra misión es
                      ayudarte a alcanzar tus objetivos de forma saludable,
                      sostenible y basada en datos.
                    </p>
                    <p className="ft-light text-sm text-justify">
                      Creamos esta app para hacer que la alimentación
                      personalizada sea simple, accesible y efectiva. Cada
                      mejora y cada actualización están pensadas para
                      acompañarte en tu proceso.
                    </p>
                  </div>

                  <div>
                    <h2 className="ft-bold text-md mb-0 xl:mb-2 text-brown">
                      ¿Algo no funciona como esperabas?¿Tienes ideas para
                      mejorar?
                    </h2>
                    <p className="flex mt-2 xl:mt-4 gap-2 ft-light text-sm items-center">
                      Nos encantará leerte
                      <img
                        src="/SVG/IconsGeneral/BrownHearthIcon.svg"
                        alt="Hearth"
                        className="w-4 h-4"
                      />
                    </p>
                  </div>

                  <div>
                    <h2 className="ft-bold text-md mb-0 xl:mb-2 text-brown">
                      Contacto:
                    </h2>
                    <p className="ft-light text-sm">contacto@tusitio.com</p>
                    <p className="ft-light text-sm">soporte@tusitio.com</p>
                  </div>

                  <div className="flex justify-center mt-0 xl:mt-6">
                    <img
                      src="/SVG/IconsGeneral/CopyrightNutria.svg"
                      alt="copyright"
                      className="w-30 h-auto"
                    />
                  </div>
                </div>
              </div>

              <div className="w-lg hidden sm:block ml-15 xl:ml-50">
                <div className="w-md xl:w-xl">
                  <object
                    type="image/svg+xml"
                    data="/Background/NutriaAboutMe.svg"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
