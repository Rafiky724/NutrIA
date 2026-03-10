type ContactInfo = {
  description: string[];
  helpText: string;
  emails: string[];
  copyright: string;
};

type Props = {
  contactInfo: ContactInfo;
  onBack: () => void;
};

export default function Contact({ onBack, contactInfo }: Props) {
  const { description, helpText, emails, copyright } = contactInfo;

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-6 w-full md:justify-around xl:justify-center xl:gap-20 xl:mt-15">
        <div className="bg-white rounded-4xl shadow-lg p-6 sm:p-8 w-2xs md:w-md xl:w-2xl flex flex-col gap-6 ml-10 md:ml-0 h-130">
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
              {description.map((p, i) => (
                <p
                  key={i}
                  className="ft-light text-xs md:text-sm text-justify mt-2"
                >
                  {p}
                </p>
              ))}
            </div>

            <div>
              <h2 className="ft-bold text-sm md:text-md mb-2 text-brown">
                ¿Algo no funciona como esperabas?
              </h2>
              <p className="flex gap-2 ft-light text-xs md:text-sm items-center">
                {helpText}
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
              {emails.map((email, i) => (
                <p key={i} className="ft-light text-xs md:text-sm">
                  {email}
                </p>
              ))}
            </div>

            <div className="flex justify-center mt-2">
              <img src={copyright} alt="copyright" className="w-30 h-auto" />
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
