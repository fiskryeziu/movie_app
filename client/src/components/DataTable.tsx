import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { TAdminMovie, TAdminUserList } from "types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends TAdminUserList | TAdminMovie, TValue>({
  columns,
  data,
  onDelete,
  onEdit,
}: DataTableProps<TData, TValue> & {
  onDelete: (data: TData) => void;
  onEdit: (data: TData) => void;
}) {
  const { userData } = useAuth();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const { pathname } = useLocation();

  return (
    <div className="mx-auto rounded-md border md:w-3/4">
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="flex gap-4">
                    {row.original.id !== userData?.id && (
                      <Trash
                        size={20}
                        className="cursor-pointer hover:text-primary"
                        onClick={() => onDelete(row.original)}
                      />
                    )}
                    {pathname === "/dashboard/users" ? (
                      <DialogTrigger
                        asChild
                        onClick={() => onEdit(row.original)}
                      >
                        <Edit
                          size={20}
                          className="cursor-pointer hover:text-primary"
                        />
                      </DialogTrigger>
                    ) : (
                      <Edit
                        size={20}
                        className="cursor-pointer hover:text-primary"
                        onClick={() => onEdit(row.original)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
