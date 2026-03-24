import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import type { User } from "../../types";
import {
  getUserProgress,
  type UserProgressResponse,
} from "../../services/userService";
import { Link } from "react-router-dom";

type Props = {
  user?: User;
  title?: string;
  subtitle?: string;
};

export default function NavBar({ user, title, subtitle }: Props) {
  const [progress, setProgress] = useState<UserProgressResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const defaultTitle = `Hola, ${user?.nombre}`;
  const defaultSubtitle = "¿Cómo va tu día?";

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await getUserProgress();
        setProgress(data);
      } catch (error) {
        console.error("Error obteniendo progreso del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const skeletonTextHeight = 24;
  const skeletonSubtitleHeight = 16;
  const skeletonIconSize = 28;
  const skeletonAvatarSize = 48;

  return (
    <nav className="flex justify-center md:justify-between items-center gap-6 md:gap-0 ml-8 md:ml-0">
      <div className="mr-4 md:mr-0 flex flex-col gap-1">
        {loading ? (
          <>
            <Skeleton height={skeletonTextHeight} width={150} />
            <Skeleton height={skeletonSubtitleHeight} width={120} />
          </>
        ) : (
          <>
            <h1 className="text-sm md:text-2xl ft-bold text-brown">
              {title ?? defaultTitle}
            </h1>
            <p className="text-xs md:text-sm ft-medium text-gray">
              {subtitle ?? defaultSubtitle}
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link
          to={"/config?view=shop"}
          className="flex items-center gap-1 hover:scale-105 transition cursor-pointer"
        >
          {loading ? (
            <Skeleton
              circle
              width={skeletonIconSize}
              height={skeletonIconSize}
            />
          ) : (
            <img
              src="/SVG/IconsGeneral/GemsIcon.svg"
              alt="Gemas"
              className="w-3 md:w-5 h-3 md:h-5"
            />
          )}
          {loading ? (
            <Skeleton width={skeletonIconSize} height={skeletonIconSize} />
          ) : (
            <p className="ft-bold text-md md:text-2xl">
              {progress?.cantidad_gemas ?? 0}
            </p>
          )}
        </Link>

        <div className="flex items-center gap-1 hover:scale-105 transition cursor-pointer">
          {loading ? (
            <Skeleton
              circle
              width={skeletonIconSize}
              height={skeletonIconSize}
            />
          ) : (
            <img
              src="/SVG/IconsGeneral/FireStreak.svg"
              alt="Racha"
              className="w-4 md:w-6 h-4 md:h-6"
            />
          )}
          {loading ? (
            <Skeleton width={skeletonIconSize} height={skeletonIconSize} />
          ) : (
            <p className="ft-bold text-md md:text-2xl">
              {progress?.numero_racha ?? 0}
            </p>
          )}
        </div>

        {loading ? (
          <Skeleton
            circle
            width={skeletonAvatarSize}
            height={skeletonAvatarSize}
          />
        ) : (
          <img
            src="/Background/LogoIcono.png"
            alt="Usuario"
            className="w-12 h-12 hover:scale-105 transition cursor-pointer"
          />
        )}
      </div>
    </nav>
  );
}
