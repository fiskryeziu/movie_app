import { trpc } from "@/trpc";
import { DataTable } from "../DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { TAdminMovie } from "types";
import { useNavigate } from "react-router-dom";

function MovieList() {
  const { data } = trpc.movie.getAllMovies.useQuery();

  const utils = trpc.useContext();
  const { mutate } = trpc.movie.deleteMovie.useMutation({
    onSuccess: () => {
      utils.invalidate();
    },
  });
  const navigate = useNavigate();

  const columns: ColumnDef<TAdminMovie>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "releaseDate",
      header: "Release",
      cell: ({ row }) => {
        const date = new Date(row.getValue("releaseDate")).toLocaleDateString(
          "en-DE",
        );
        return <div>{date}</div>;
      },
    },
  ];
  const deleteHandler = (data: TAdminMovie) => {
    const isConfirmed = confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      mutate({ id: data.id });
    }
  };
  const editHandler = (data: TAdminMovie) => {
    navigate(`/dashboard/movies/edit/${data.id}`);
  };

  return (
    <main className="mt-20">
      <DataTable
        columns={columns}
        data={data ?? []}
        onDelete={deleteHandler}
        onEdit={editHandler}
      />
    </main>
  );
}

export default MovieList;
