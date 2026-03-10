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
    <div>
      <button
        onClick={onBack}
        className="w-full rounded-2xl bg-gray-200 p-3 px-4 transition hover:scale-105 flex items-center justify-between cursor-pointer"
      >
        <img
          src="/SVG/IconsGeneral/ArrowOptionIcon.svg"
          alt="back"
          className="w-4 h-4 rotate-180"
        />
        <h4 className="ft-light text-xs sm:text-md xl:text-lg">Volver</h4>
      </button>

      <div className="flex flex-col gap-6 text-left mt-4">
        <div>
          <h2 className="ft-bold text-md mb-2 text-brown">Estamos contigo</h2>
          {description.map((p, i) => (
            <p key={i} className="ft-light text-sm text-justify mt-2">
              {p}
            </p>
          ))}
        </div>

        <div>
          <h2 className="ft-bold text-md mb-2 text-brown">
            ¿Algo no funciona como esperabas?
          </h2>
          <p className="flex gap-2 ft-light text-sm items-center">
            {helpText}
            <img
              src="/SVG/IconsGeneral/BrownHearthIcon.svg"
              alt="Hearth"
              className="w-4 h-4"
            />
          </p>
        </div>

        <div>
          <h2 className="ft-bold text-md mb-2 text-brown">Contacto</h2>
          {emails.map((email, i) => (
            <p key={i} className="ft-light text-sm">
              {email}
            </p>
          ))}
        </div>

        <div className="flex justify-center">
          <img src={copyright} alt="copyright" className="w-30 h-auto" />
        </div>
      </div>
    </div>
  );
}
