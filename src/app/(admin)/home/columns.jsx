"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const columns = ({ editingRowId, setEditingRowId, handleSaveRow, handleCancelEdit }) => [
  {
    accessorKey: "id",
    header: "ID",
    cell: (info) => info.getValue() || "-",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const isEditing = editingRowId === row.original.id;
      return isEditing ? (
        <Input
          defaultValue={row.original.name}
          onChange={(e) => row.original.name = e.target.value} // Update directly in the row object
          placeholder="Edit Name..."
        />
      ) : (
        <span>{row.original.name}</span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const isEditing = editingRowId === row.original.id;
      return isEditing ? (
        <Input
          defaultValue={row.original.email}
          onChange={(e) => row.original.email = e.target.value} // Update directly in the row object
          placeholder="Edit Email..."
        />
      ) : (
        <span>{row.original.email}</span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className="w-[200px]">
          {row.original.createdAt ? format(new Date(row.original.createdAt), 'dd MMMM yyyy - HH:mm:ss', { locale: id }) : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      return (
        <div className="w-[200px]">
          {row.original.updatedAt ? format(new Date(row.original.updatedAt), 'dd MMMM yyyy - HH:mm:ss', { locale: id }) : "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const isEditing = editingRowId === row.original.id;
      return isEditing ? (
        <div className="flex gap-2">
          <Button variant="primary" onClick={() => handleSaveRow(row.original)}>Save</Button>
          <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
        </div>
      ) : (
        <Button variant="ghost" onClick={() => setEditingRowId(row.original.id)}>Edit</Button>
      );
    },
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const list_data = row.original;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuItem
  //             onClick={() => handleDetail(list_data.outlet_id, list_data.outlet_map_location_id)}
  //           >
  //             Detail
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator/>
  //           <DropdownMenuItem
  //             onClick={() => handleRejectOrApprove('reject', list_data.outlet_id, list_data.outlet_map_location_id, list_data.code)}
  //           >
  //             Edit
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator/>
  //             <DropdownMenuItem
  //             onClick={() => handleRejectOrApprove('approve', list_data.outlet_id, list_data.outlet_map_location_id, list_data.code)}
  //           >
  //             Delete
  //           </DropdownMenuItem>
  //        </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },

];