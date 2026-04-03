type Props = {
  onBack: () => void;
};

export default function Contact({ onBack }: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-6 w-full md:justify-around xl:justify-center xl:gap-20 xl:mt-15">
        <div className="bg-white rounded-4xl shadow-lg p-6 sm:p-8 w-2xs md:w-md xl:w-lg flex flex-col gap-6 ml-10 md:ml-0 h-130">
          <button
            onClick={onBack}
            className="w-full rounded-4xl bg-gray-200 p-2 px-4 transition hover:scale-105 flex items-center justify-between cursor-pointer"
          >
            <img
              src="/SVG/IconsGeneral/ArrowOptionIcon.svg"
              alt="back"
              className="w-4 h-4 rotate-180"
            />
            <h4 className="ft-medium text-xs sm:text-md">Volver</h4>
          </button>

          <div className="flex flex-col gap-6 text-left">
            <div>
              <h2 className="ft-bold text-md mb-2 text-brown">
                Estamos contigo
              </h2>

              <p className="ft-light text-xs md:text-sm text-justify mt-2">
                Somos un equipo apasionado por la nutrición personalizada y la
                tecnología aplicada al bienestar. Nuestra misión es ayudarte a
                alcanzar tus objetivos de forma saludable, sostenible y basada
                en datos.
              </p>
              <p className="ft-light text-xs md:text-sm text-justify mt-2">
                Creamos esta app para hacer que la alimentación personalizada
                sea simple, accesible y efectiva.
              </p>
            </div>

            <div>
              <h2 className="ft-bold text-sm md:text-md mb-2 text-brown">
                ¿Algo no funciona como esperabas?
              </h2>
              <p className="flex gap-2 ft-light text-xs md:text-sm items-center">
                Nos encantará leerte
                <img
                  src="/SVG/IconsGeneral/BrownHearthIcon.svg"
                  alt="Hearth"
                  className="w-4 h-4"
                />
              </p>
            </div>

            <div>
              <h2 className="ft-bold text-sm md:text-md mb-2 text-brown">
                Contacto
              </h2>

              <p className="ft-light text-xs md:text-sm">
                jaortegac@correo.usbcali.edu.co
              </p>

              <p className="ft-light text-xs md:text-sm">
                jafuentesp@correo.usbcali.edu.co
              </p>
            </div>

            <div className="flex justify-center mt-2">
              <img
                src="/SVG/IconsGeneral/CopyrightNutria.svg"
                alt="copyright"
                className="w-30 h-auto"
              />
            </div>
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="w-md xl:w-xl flex flex-col items-center">
            <object
              type="image/svg+xml"
              data="/Background/NutriaAboutMe.svg"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}
