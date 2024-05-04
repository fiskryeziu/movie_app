import Carousel from "@/components/Carousel";
import Latest from "@/components/Latest";
import MainPageSkeleton from "@/components/MainPageSkeleton";
import MostViewed from "@/components/MostViewed";
import Upcoming from "@/components/Upcoming";
import { trpc } from "@/trpc";

const Main = () => {
  const { data, isLoading } = trpc.movie.getMovies.useQuery();
  return (
    <>
      {isLoading ? (
        <MainPageSkeleton />
      ) : (
        <>
          <div className="px-2 pb-20 pt-5">
            <p className="pb-5 text-xl font-bold uppercase text-primary">
              Trending
            </p>
            <Carousel movies={data || []} />
          </div>
          <Latest movies={data || []} />
          <MostViewed />
          <Upcoming movies={data || []} />
        </>
      )}
    </>
  );
};

export default Main;
