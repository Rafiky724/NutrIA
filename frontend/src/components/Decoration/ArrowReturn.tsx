import { Link } from "react-router-dom";

interface Props {
  to?: string;
  onClick?: () => void;
}

export default function ArrowReturn({ to = "/", onClick }: Props) {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (onClick) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div className="absolute top-5 left-5 z-10 w-6 hover:scale-110 transition cursor-pointer">
      <Link to={to} onClick={handleClick}>
        <img
          src="/SVG/IconsGeneral/ArrowReturn.svg"
          alt="Volver al inicio"
          className="w-auto h-auto cursor-pointer"
        />
      </Link>
    </div>
  );
}
