import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Star, X } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Movie } from "types";

type CardContent = {
  isHidden: boolean;
  showDelete?: boolean;
  onDelete?: (value: string) => void;
  movie: Movie;
};
const Card = ({
  movie,
  isHidden = false,
  onDelete,
  showDelete,
}: CardContent) => {
  return (
    <div className="relative aspect-[4/3] h-auto w-full duration-75  hover:-translate-y-1 hover:duration-200">
      {showDelete && onDelete && (
        <button
          className="absolute right-1 top-1 block rounded-full bg-white p-1"
          onClick={() => onDelete(movie.id)}
        >
          <X color="black" size={16} />
        </button>
      )}
      <HoverCard closeDelay={0}>
        <HoverCardTrigger href={`/movie/${movie?.id}`}>
          <LazyLoadImage
            src={movie?.coverImageUrl}
            alt="movie"
            width={200}
            height={320}
            className="object-cover"
          />
        </HoverCardTrigger>
        <HoverCardContent hidden={isHidden}>
          <div>
            <div className="mb-2">
              <p className="line-clamp-2 text-xl font-bold">{movie?.title}</p>
              <div className="my-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star color="yellow" size={16} fill="yellow" />{" "}
                  <p>{movie?.rating}</p>
                </div>
                <p>{movie?.duration}</p>
              </div>
              <p className="line-clamp-3">
                Doctor Strange teams up with a mysterious teenage girl from his
                dreams who can travel across multiverses, to battle multiple
                threats, including other-universe versions of himself, which
                threaten to wipe out millions across the multiverse.
              </p>
            </div>

            <div className="text-sm">
              <p>
                Aired:<span className="font-bold"> 2022</span>
              </p>
              <p>
                Genres :<span className="font-bold"> Action, Adventure</span>
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default Card;
