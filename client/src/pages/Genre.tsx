import Card from "@/components/Card";
import CardsSkeleton from "@/components/CardsSkeleton";
import { trpc } from "@/trpc";
import { useParams } from "react-router-dom";

const Genre = () => {
  const { type } = useParams();

  const { data, isLoading } = trpc.movie.getMoviesByGenre.useQuery({
    genre: type!,
  });

  if (isLoading) return <CardsSkeleton />;
  return (
    <div className="mt-20 flex flex-col">
      <p className="pb-5 text-xl font-bold uppercase text-primary">{type}</p>
      <div className="grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5 lg:gap-10">
        {data &&
          data.map((movie) => (
            <Card key={movie.id} isHidden={false} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Genre;
