import { Movie } from "types";
import { Skeleton } from "./ui/skeleton";
import { trpc } from "@/trpc";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
type TMovie = {
  movie: Movie;
  isLoading: boolean;
};

const MoviePlay = ({ movie, isLoading }: TMovie) => {
  const { mutate } = trpc.movie.incrementView.useMutation({
    onSuccess: () => {
      console.log("success");
      localStorage.setItem(`viewed_${movie.id}`, "anystring");
    },
    onError: () => {
      console.log("error");
    },
  });
  const [isIncluded, setIsIncluded] = useState(() => {
    const data = localStorage.getItem("watchList");
    const existing = data ? (JSON.parse(data) as Movie[]) : [];
    return existing.some((x) => x.id === movie.id);
  });

  useEffect(() => {
    const hasViewed = localStorage.getItem(`viewed_${movie.id}`);

    if (!hasViewed && movie.id) {
      mutate({
        movieId: movie.id,
      });
    }
  }, [movie.id, mutate]);

  const addWatchList = () => {
    const data = localStorage.getItem("watchList");
    if (data) {
      const existing = JSON.parse(data) as Movie[];
      if (!existing.some((x) => x.id === movie.id)) {
        existing.push(movie);
        localStorage.setItem("watchList", JSON.stringify(existing));
        setIsIncluded(true);
      }
    } else {
      localStorage.setItem("watchList", JSON.stringify([movie]));
      setIsIncluded(true);
    }
  };
  const removeWatchList = () => {
    const data = localStorage.getItem("watchList");
    if (data) {
      const existing = JSON.parse(data) as Movie[];
      const updatedList = existing.filter((x) => x.id !== movie.id);
      localStorage.setItem("watchList", JSON.stringify(updatedList));
      setIsIncluded(false);
    }
  };

  return (
    <>
      <div className="w-full">
        {isLoading ? (
          <Skeleton className="w-full sm:h-auto md:h-[400px] lg:h-[540px]" />
        ) : (
          <div className="relative h-0 w-full pb-[56.250%]">
            <iframe
              src={movie.movieURL}
              width="100%"
              height="100%"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: "0px",
                top: "0px",
                overflow: "hidden",
              }}
            ></iframe>
          </div>
        )}
      </div>
      <div className="mb-10 flex justify-between gap-5">
        <a
          href={movie.trailerUrl}
          target="_blank"
          className="flex rounded-md bg-secondary p-2 text-left text-sm font-bold hover:bg-primary hover:duration-150 sm:text-base"
        >
          Watch Trailer
        </a>
        <button onClick={isIncluded ? removeWatchList : addWatchList}>
          <Heart fill={isIncluded ? "red" : ""} color={"red"} />
        </button>
      </div>
    </>
  );
};

export default MoviePlay;
