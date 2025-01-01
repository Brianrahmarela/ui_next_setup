"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const columns = ({ editingRowId, setEditingRowId, handleSaveRow, handleCancelEdit, handleDeleteRow }) => [
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
          onChange={(e) => (row.original.name = e.target.value)} // Memodifikasi langsung data baris
          placeholder="Edit Name..."
        />
      ) : (
        <div className="w-[200px]">{row.original.name}</div>
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
          onChange={(e) => (row.original.email = e.target.value)} // Memodifikasi langsung data baris
          placeholder="Edit Email..."
        />
      ) : (
        <div  className="w-[200px]">{row.original.email}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="w-[220px]">
        {row.original.createdAt
          ? format(new Date(row.original.createdAt), "dd MMMM yyyy - HH:mm:ss", { locale: id })
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => (
      <div className="w-[220px]">
        {row.original.updatedAt
          ? format(new Date(row.original.updatedAt), "dd MMMM yyyy - HH:mm:ss", { locale: id })
          : "-"}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const isEditing = editingRowId === row.original.id;
      return isEditing ? (
        <div className="relative">

            <DropdownMenu >
              <DropdownMenuTrigger asChild disabled={editingRowId}>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              </DropdownMenuContent>
            </DropdownMenu> 
          <Card className="absolute left-[-95px] top-9 bg-white z-50 rounded-md m-0 p-0 shadow-md">
            <div className="p-1 m-0">
              <Button variant="primary" className="w-full text-left hover:bg-[#fafafa] m-0 p-0 w-[115px]" onClick={() => handleSaveRow(row.original)}>
              <div className="flex justify-start w-full font-normal ml-2 ">Save</div> 
              </Button>
            </div>
            <Separator style={{display: 'block'}}/>
            <div className="p-1 m-0">
              <Button variant="primary" className="w-full text-left hover:bg-[#fafafa] m-0 p-0 w-[115px]" onClick={() => handleCancelEdit(row.original)}>
                <div className="flex justify-start w-full font-normal ml-2 ">Cancel</div> 
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <div className="w-[70px]">
          <DropdownMenu >
            <DropdownMenuTrigger asChild disabled={editingRowId} >
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => {}}
              >
                Detail
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
                <DropdownMenuItem
                  disabled={!!editingRowId} // Disable jika sedang mengedit baris lain
                  variant="ghost"
                  onClick={() => setEditingRowId(row.original)}
                >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
                <DropdownMenuItem
                  disabled={!!editingRowId} // Disable jika sedang mengedit baris lain
                  variant="ghost"
                  onClick={() => handleDeleteRow(row.original)}
                >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];