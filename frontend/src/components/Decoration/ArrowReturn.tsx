import { Link } from "react-router-dom";

export default function ArrowReturn({ to = "/" }) {
  return (
    <div className="absolute top-5 left-5 z-10 w-10">
      <Link to={to}>
        <img
          src="/SVG/IconsGeneral/ArrowReturn.svg"
          alt="Volver al inicio"
          className="w-auto h-auto cursor-pointer"
        />
      </Link>
    </div>
  );
}
