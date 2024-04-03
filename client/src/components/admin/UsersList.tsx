import { trpc } from "@/trpc";
import { TAdminUserList } from "types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../DataTable";
import { useState } from "react";
import { Dialog } from "../ui/dialog";
import UserModal from "./UserModal";

function UsersList() {
  const { data } = trpc.user.getUsers.useQuery();
  const { mutate } = trpc.user.deleteUser.useMutation();

  const [user, setUser] = useState<TAdminUserList | null>(null);
  const [open, setOpen] = useState(false);

  const columns: ColumnDef<TAdminUserList>[] = [
    {
      accessorKey: "username",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
  ];

  const deleteHandler = (data: TAdminUserList) => {
    const isConfirmed = confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      mutate({ id: data.id });
    }
  };
  const editHandler = (data: TAdminUserList) => {
    setUser(data);
  };

  return (
    <main className="relative mt-20">
      <Dialog open={open} onOpenChange={setOpen}>
        <DataTable
          columns={columns}
          data={data ?? []}
          onDelete={deleteHandler}
          onEdit={editHandler}
        />
        <UserModal user={user} setOpen={setOpen} />
      </Dialog>
    </main>
  );
}

export default UsersList;
