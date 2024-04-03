import { Movie } from "types";
import Card from "./Card";
import { useState } from "react";

const WatchList = () => {
  const watchList: Movie[] =
    JSON.parse(localStorage.getItem("watchList")!) ?? [];
  const [list, setList] = useState<Movie[]>(() => {
    return JSON.parse(localStorage.getItem("watchList")!) ?? [];
  });

  const deleteHandler = (id: string) => {
    if (id) {
      const newList = watchList.filter((x) => x.id !== id);

      localStorage.setItem("watchList", JSON.stringify(newList));
      setList(newList);
    }
  };
  return (
    <div className="flex flex-col items-start gap-2 p-2">
      <div className="grid  max-w-xs grid-cols-3 gap-4">
        {list.length > 0 &&
          list.map((movie: Movie) => (
            <Card
              key={movie.id}
              isHidden={true}
              movie={movie}
              onDelete={deleteHandler}
              showDelete={true}
            />
          ))}
      </div>
      {watchList.length > 0 ? (
        <button
          className="mx-auto rounded-sm bg-primary px-2 text-sm"
          onClick={() => {
            localStorage.setItem("watchList", JSON.stringify([]));
            setList([]);
          }}
        >
          Clear
        </button>
      ) : (
        <p>Watch list it's empty</p>
      )}
    </div>
  );
};

export default WatchList;
