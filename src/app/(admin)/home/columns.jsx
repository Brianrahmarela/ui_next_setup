"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';


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
          onChange={(e) => (row.original.name = e.target.value)} // Memodifikasi langsung data baris
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
          onChange={(e) => (row.original.email = e.target.value)} // Memodifikasi langsung data baris
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
    cell: ({ row }) => (
      <div className="w-[200px]">
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
      <div className="w-[200px]">
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
        <div className="flex gap-2">
          <Button variant="primary" onClick={() => handleSaveRow(row.original)}>
            Save
          </Button>
          <Button variant="secondary" onClick={() => handleCancelEdit(row.original)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          disabled={!!editingRowId} // Disable jika sedang mengedit baris lain
          variant="ghost"
          onClick={() => setEditingRowId(row.original)}
        >
          Edit
        </Button>
      );
    },
  },
];