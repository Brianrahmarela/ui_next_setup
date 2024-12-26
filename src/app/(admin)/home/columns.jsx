"use client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem,} from "@/components/ui/command"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import DateTimePicker from "@/components/home/date-time-picker";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export const columns = ({ isPerluValidasi, dataUpdateColIsPerluValidasi, handleUpdateAllColIsPerluValidasi, token, kategoriOpt, 
  subKategoriOpt, solusiOpt, responsibleDeptOpt, handleUpdateValidCol, handleUpdateKategoriCol, debouncedNoHpcust, 
  handleWaktuSolvedIsPerluValidasiCol, handleUpdateSolusiCol, debouncedProgress, handleUpdateActionableCol, handleUpdateResponsibleCol
}) => [
  {
    accessorKey: "_id",
    header: "ID",
    cell: (info) => info.getValue() || "-",
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      return (
        <div className="w-[200px]">
          {row.original.username}
        </div>
      );
    },
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => {
      return (
        <div className="w-[200px]">
          {row.original.password}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "ordered_at",
  //   header: "Tanggal Order",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="w-[200px]">
  //         {row.original.ordered_at ? format(new Date(row.original.ordered_at), 'dd MMMM yyyy - HH:mm:ss', { locale: id }) : "-"}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "created_by",
  //   header: "Dibuat Oleh",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="w-[150px]">
  //         {row.original.created_by?.name ? row.original.created_by?.name : "-"}
  //       </div>
  //     );
  //   },
  //   // cell: (info) => info.getValue() || "-",
  // },
  // {
  //   accessorKey: "is_valid_updated_by",
  //   header: "Diupdate Oleh",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="w-[150px]">
  //         {row.original.is_valid_updated_by?.name ? row.original.is_valid_updated_by?.name : "-"}
  //       </div>
  //     );
  //   },
  //   // cell: (info) => info.getValue() || "-",
  // },
  // {
  //   accessorKey: "source",
  //   header: "Sumber",
  //   cell: (info) => info.getValue() || "-",
  // },
  // {
  //   accessorKey: "channel.name",
  //   header: "Channel",
  //   cell: (info) => info.getValue() || "-",
  // },
  // {
  //   accessorKey: "external_order_id",
  //   header: "ID Order",
  //   cell: (info) => info.getValue() || "-",
  // },
  // {
  //   accessorKey: "merchant.name",
  //   header: "Outlet",
  //   cell: (info) => info.getValue() || "-",
  // },
  // {
  //   accessorKey: "item_names",
  //   header: "Item",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="w-[200px]">
  //         {row.original.item_names ? row.original.item_names : "-"}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "comment",
  //   header: "Komentar",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="w-[200px]">
  //         {row.original.comment ? row.original.comment : "-"}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "tags",
  //   header: "Tag",
  //   cell: ({ row }) => {
  //     return (
  //       <div >
  //         {row.original.tags == null ? <p>-</p> : row.original.tags?.join(", ")}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "images",
  //   header: "Gambar",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="w-[150px] pt-[5px]">
  //         {row.original.images == null ? <div>-</div> : 
  //           <div className="flex overflow-x-auto whitespace-nowrap bg-transparent pt-[5px]">
  //             {row.original.images.map((imageUrl, index) => (
  //               <div key={index} className=" mr-2 ">
  //                 <Dialog className="m-0 p-0">
  //                   <DialogTrigger asChild>
  //                     <Image
  //                       priority
  //                       alt={`image-${index}`}
  //                       src={imageUrl}
  //                       width={100}
  //                       height={110}
  //                       className="rounded-md transition duration-300 ease-in-out hover:opacity-80"
  //                     />
  //                   </DialogTrigger>
  //                   <DialogContent className="min-w-[50vw] min-h-[50vh] rounded-md m-0 p-0 border-none">
  //                   <Image
  //                     priority
  //                     alt={`image-${index}`}
  //                     src={imageUrl}
  //                     width={0}
  //                     height={0}
  //                     sizes="100vw"
  //                     style={{ width: '100%', height: '100%'}}
  //                     className="rounded-md object-cover"
  //                   />
  //                   </DialogContent>
  //                 </Dialog>
  //               </div>
  //             ))}
  //           </div>
  //         }
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "rating",
  //   header: "Rating",
  //   cell: ({ row }) => {
  //     return (
  //       <div >
  //         {row.original.rating ? row.original.rating : "-"}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "is_valid_home",
  //   header: "Valid",
  //   cell: ({ row }) => {
  //     let datas = row.original;

  //     return (
  //       <Select onValueChange={(val) => handleUpdateValidCol(datas.id, val)} defaultValue={row.original.is_valid_home?.toString()} >
  //           <SelectTrigger className="w-full justify-between bg-white hover:bg-gray-100">
  //             <SelectValue placeholder="-" />
  //           </SelectTrigger>
  //         <SelectContent>
  //           <SelectItem value="null">-</SelectItem>
  //           <SelectItem value="true">Valid</SelectItem>
  //           <SelectItem value="false">Invalid</SelectItem>
  //         </SelectContent>
  //       </Select>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "review_home_category",
  //   header: "Kategori",
  //   cell: ({ row }) => {
  //     let datas = row.original;
  //     let datasRow = row.original.review_home_category;

  //     return (
  //       <Popover>
  //       <PopoverTrigger asChild>
  //           <Button
  //             variant="outline"
  //             role="combobox"
  //             className={cn("w-full justify-between font-light xl:min-w-[200px] min-w-[120px]", !datasRow && "text-muted-foreground")}
  //           >
  //             {datasRow?.id
  //               ? kategoriOpt?.find(
  //                   (kategori) => kategori.id === datasRow.id
  //                 )?.title
  //               : datasRow === null ? "-" : "Pilih Kategori"}
  //             <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  //           </Button>
  //       </PopoverTrigger>
  //       <PopoverContent className="PopoverContent p-2">
  //         <Command>
  //           <CommandInput
  //             placeholder="Search kategori..."
  //             className="h-9 "
  //           />
  //           <CommandEmpty>No kategori found.</CommandEmpty>
  //           <CommandGroup className="overflow-y-auto max-h-[350px] ">
  //             <CommandItem
  //               value="null"
  //                 onSelect={() => {
  //                   handleUpdateKategoriCol('category', datas.id, null);
  //                 }}
  //             >
  //               -
  //               <CheckIcon
  //               className={cn(
  //                 "ml-auto h-4 w-4",
  //                 (datasRow === null) ? "opacity-100" : "opacity-0"
  //               )}
  //             />
  //             </CommandItem>
  //             {kategoriOpt.map((kategori) => (
  //               <CommandItem
  //                 value={kategori.title}
  //                 key={kategori.id}
  //                 onSelect={() => {
  //                   handleUpdateKategoriCol('category', datas.id, kategori.id);
  //                 }}
  //               >
  //                 {kategori.title} 
  //                 <CheckIcon
  //                   className={cn(
  //                     "ml-auto h-4 w-4",
  //                     kategori.id === datasRow?.id
  //                       ? "opacity-100"
  //                       : "opacity-0"
  //                   )}
  //                 />
  //               </CommandItem>
  //             ))}
  //           </CommandGroup>
  //         </Command>
  //       </PopoverContent>
  //     </Popover>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "review_home_sub_category",
  //   header: "Sub Kategori",
  //   cell: ({ row }) => {
  //     let datas = row.original;
  //     let datasRow = row.original.review_home_sub_category;
      
  //     return (
  //       <Popover>
  //       <PopoverTrigger asChild>
  //           <Button
  //             variant="outline"
  //             role="combobox"
  //             className={cn("w-full justify-between font-light xl:min-w-[200px] min-w-[120px]", !datasRow && "text-muted-foreground")}
  //           >
  //             {datasRow?.id
  //               ? subKategoriOpt?.find(
  //                   (subKategori) => subKategori.id === datasRow.id
  //                 )?.title
  //               : datasRow === null ? "-" : "Pilih Sub Kategori"}
  //             <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  //           </Button>
  //       </PopoverTrigger>
  //       <PopoverContent className="PopoverContent p-2">
  //         <Command>
  //           <CommandInput
  //             placeholder="Search subKategori..."
  //             className="h-9 "
  //           />
  //           <CommandEmpty>No subKategori found.</CommandEmpty>
  //           <CommandGroup className="overflow-auto max-h-[350px]">
  //             <CommandItem
  //               value="null"
  //                 onSelect={() => {
  //                   handleUpdateKategoriCol('sub_category', datas.id, null);
  //                 }}
  //             >
  //               -
  //               <CheckIcon
  //               className={cn(
  //                 "ml-auto h-4 w-4",
  //                 (datasRow === null) ? "opacity-100" : "opacity-0"
  //               )}
  //             />
  //             </CommandItem>
  //             {subKategoriOpt.map((subKategori) => (
  //               <CommandItem
  //                 value={subKategori.title}
  //                 key={subKategori.id}
  //                 onSelect={() => {
  //                   handleUpdateKategoriCol('sub_category', datas.id, subKategori.id);
  //                 }}
  //               >
  //                 {subKategori.title} 
  //                 <CheckIcon
  //                   className={cn(
  //                     "ml-auto h-4 w-4",
  //                     subKategori.id === datasRow?.id
  //                       ? "opacity-100"
  //                       : "opacity-0"
  //                   )}
  //                 />
  //               </CommandItem>
  //             ))}
  //           </CommandGroup>
  //         </Command>
  //       </PopoverContent>
  //     </Popover>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "customer_phone",
  //   header: "No. HP Customer",
  //   cell: ({ row }) => {
  //     let datas = row.original;
  //     let datasRow = row.original.customer_phone;

  //     return (
  //       <div className="w-[150px]">
  //         <Input
	// 						placeholder="Phonenumber..."
  //             defaultValue={datasRow === null || datasRow === '' ? '-' : datasRow}
	// 						onChange={(e) => debouncedNoHpcust(e.target.value, datas.id)}
  //             className={cn(
  //               "w-full justify-between bg-white hover:bg-gray-100",
  //             )}
	// 					/>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "solved_at",
  //   header: "Waktu Solved",
  //   cell: ({ row }) => {
  //     let datas = row.original;
  //     let datasRow = row.original.solved_at;

  //     return (  
  //       <DateTimePicker isPerluValidasi={isPerluValidasi} handleWaktuSolvedIsPerluValidasiCol={handleWaktuSolvedIsPerluValidasiCol} datas={datas} datasRow={datasRow} token={token}/>   
  //     );
  //   },
  // },
  // {
  //   accessorKey: "review_solution",
  //   header: "Solusi",
  //   cell: ({ row }) => {      
  //     let datas = row.original;
  //     let datasRow = row.original.review_solution;

  //     return (
  //       <Popover>
  //       <PopoverTrigger asChild>
  //           <Button
  //             variant="outline"
  //             role="combobox"
  //             className={cn("w-full justify-between font-light xl:min-w-[200px] min-w-[120px]", !datasRow && "text-muted-foreground")}
  //           >
  //             {datasRow?.id
  //               ? solusiOpt?.find(
  //                   (solusi) => solusi.id === datasRow.id
  //                 )?.title
  //                 : datasRow === null ? "-" : "Pilih Solusi"}
  //                 <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  //           </Button>
  //       </PopoverTrigger>
  //       <PopoverContent className="PopoverContent p-2">
  //         <Command>
  //           <CommandInput
  //             placeholder="Search solusi..."
  //             className="h-9 "
  //             onValueChange={() => {}}
  //           />
  //           <CommandEmpty>No solusi found.</CommandEmpty>
  //           <CommandGroup className="overflow-auto max-h-[350px]">
  //             <CommandItem
  //               value="null"
  //                 onSelect={() => {
  //                   handleUpdateSolusiCol(datas.id, null)
  //                 }}
  //             >
  //               -
  //               <CheckIcon
  //               className={cn(
  //                 "ml-auto h-4 w-4",
  //                 (datasRow === null) ? "opacity-100" : "opacity-0"
  //               )}
  //             />
  //             </CommandItem>
  //             {solusiOpt.map((solusi) => (
  //               <CommandItem
  //                 value={solusi.title}
  //                 key={solusi.id}
  //                 onSelect={() => {
  //                   handleUpdateSolusiCol(datas.id, solusi.id)
  //                 }}
  //               >
  //                 {solusi.title} 
  //                 <CheckIcon
  //                   className={cn(
  //                     "ml-auto h-4 w-4",
  //                     solusi.id === datasRow?.id
  //                       ? "opacity-100"
  //                       : "opacity-0"
  //                   )}
  //                 />
  //               </CommandItem>
  //             ))}
  //           </CommandGroup>
  //         </Command>
  //       </PopoverContent>
  //     </Popover>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "progress",
  //   header: "Progress",
  //   cell: ({ row }) => {
  //     let datas = row.original;
  //     let datasRow = row.original.progress;

  //     return (
  //       <div className="w-[150px]">
  //       <Input
  //         placeholder="Progress..."
  //         defaultValue={datasRow === null ? '-' : datasRow}
  //         onChange={(e) => debouncedProgress(e.target.value, datas.id)}
  //         className={cn(
  //           "w-full justify-between bg-white hover:bg-gray-100",
  //         )}
  //       />
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "is_actionable",
  //   header: "Actionable",
  //   cell: ({ row }) => {
  //     let datas = row.original;

  //     return (
  //       <Select onValueChange={(val) => handleUpdateActionableCol(datas.id, val)}
  //        defaultValue={row.original.is_actionable?.toString() || ''} >
  //           <SelectTrigger className="w-full justify-between bg-white hover:bg-gray-100">
  //             <SelectValue placeholder="-" />
  //           </SelectTrigger>
  //         <SelectContent>
  //           <SelectItem value="null">-</SelectItem>
  //           <SelectItem value="true">Actionable</SelectItem>
  //           <SelectItem value="false">Unactionable</SelectItem>
  //         </SelectContent>
  //       </Select>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "review_responsible_department",
  //   header: "Responsible Department",
  //   cell: ({ row }) => {
  //     let datas = row.original;
  //     let datasRow = row.original.review_responsible_department;

  //     return (
  //       <Popover>
  //       <PopoverTrigger asChild>
  //           <Button
  //             variant="outline"
  //             role="combobox"
  //             className={cn("w-full justify-between font-light min-w-[120px]", !datasRow && "text-muted-foreground")}
  //           >
  //             {datasRow?.id
  //               ? responsibleDeptOpt?.find(
  //                   (department) => department.id === datasRow.id
  //                 )?.title
  //                 : datasRow === null ? "-" : "Pilih Department"}
  //             <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  //           </Button>
  //       </PopoverTrigger>
  //       <PopoverContent className="PopoverContent p-2">
  //         <Command>
  //           <CommandInput
  //             placeholder="Search department..."
  //             className="h-9 "
  //             onValueChange={() => {}}
  //           />
  //           <CommandEmpty>No department found.</CommandEmpty>
  //           <CommandGroup className="overflow-auto max-h-[350px]">
  //             <CommandItem
  //               value="null"
  //                 onSelect={() => {
  //                   handleUpdateResponsibleCol(datas.id, null)
  //                 }}
  //             >
  //               -
  //               <CheckIcon
  //               className={cn(
  //                 "ml-auto h-4 w-4",
  //                 (datasRow === null) ? "opacity-100" : "opacity-0"
  //               )}
  //             />
  //             </CommandItem>
  //             {responsibleDeptOpt.map((department) => (
  //               <CommandItem
  //                 value={department.title}
  //                 key={department.id}
  //                 onSelect={() => {
  //                   handleUpdateResponsibleCol(datas.id, department.id)
  //                 }}
  //               >
  //                 {department.title} 
  //                 <CheckIcon
  //                   className={cn(
  //                     "ml-auto h-4 w-4",
  //                     department.id === datasRow?.id
  //                       ? "opacity-100"
  //                       : "opacity-0"
  //                   )}
  //                 />
  //               </CommandItem>
  //             ))}
  //           </CommandGroup>
  //         </Command>
  //       </PopoverContent>
  //     </Popover>
  //     )
  //   },
  // },
  // {
  //     id: "actions",
  //     header: "Actions",
  //     cell: ({ row }) => {
  //       const datas = row.original;
  //       const isIdExists = dataUpdateColIsPerluValidasi.some(data => data.id === datas.id);
        
  //       return (
  //         <Button
  //           disabled={dataUpdateColIsPerluValidasi.length !== 0 && isIdExists ? false : true}
  //           onClick={() => handleUpdateAllColIsPerluValidasi( datas.id)}
  //         >Simpan</Button>
  //       );
  //     },
  // }
];