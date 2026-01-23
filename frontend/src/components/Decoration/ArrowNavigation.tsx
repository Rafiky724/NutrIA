interface Props {
  onPrev: () => void;
  onNext: () => void;
  size?: number;
}

export default function ArrowNavigation({ onPrev, onNext, size = 8 }: Props) {
  const arrowSizeClass = `w-${size} h-${size}`;
  return (
    <>
      {/* Flecha izquierda / anterior */}
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-4 top-2/3 transform -translate-y-1/2 cursor-pointer"
      >
        <img
          src="/SVG/IconsGeneral/ArrowStep.svg"
          alt="Anterior"
          className={`${arrowSizeClass} rotate-180`}
        />
      </button>

      {/* Flecha derecha / siguiente */}
      <button
        type="button"
        onClick={onNext}
        className="absolute right-4 top-2/3 transform -translate-y-1/2 cursor-pointer"
      >
        <img
          src="/SVG/IconsGeneral/ArrowStep.svg"
          alt="Siguiente"
          className={arrowSizeClass}
        />
      </button>
    </>
  );
}
