"use client";
import React, {useState} from "react";
import { API } from '@/config';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem,} from "@/components/ui/command"
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import DateTimePicker from "./date-time/date-time-picker";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { customRevalidatePath } from "@/lib/action";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

const phoneRegex = new RegExp(
  /(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/g
);

const formSchema = z.object({
  // store_id: z.number({
  //   required_error: "Outlet harus dipilih.",
  // }),
  store_id: z.number().nullable().refine(data => data !== null, {
    message: 'Outlet harus dipilih.'
  }),
  brand_id: z.number().nullable().refine(data => data !== null, {
    message: 'Brand harus dipilih.'
  }),
  channel_id: z.number().nullable().refine(data => data !== null, {
    message: 'Channel harus dipilih.'
  }),
  source: z.string().nullable().refine(data => data !== 'null', {
    message: "Sumber harus dipilih.",
  }),
  reviewed_at: z.string().min(2, {
    message: "Tanggal review harus dipilih.",
  }),
  ordered_at: z.string().nullable(),
  is_valid_home: z.string().nullable(),
  is_actionable: z.string().nullable(),
  item_names: z.array(z.string()).nullable(),
  rating: z.number().nullable(),
  review_category: z.string().nullable(),
  review_home_category_id: z.any().nullable(),
  review_home_sub_category_id: z.any().nullable(),
  customer_phone: z.string().regex(phoneRegex, 'Nomor telephone tidak valid.').nullable(),
  customer_name: z.string().nullable(),
  solved_at: z.string().nullable(),
  review_solution_id: z.any().nullable(),
  progress: z.string().nullable(),
  review_responsible_department_id: z.any().nullable(),
  comment: z.string().nullable(),
  external_order_id: z.string().nullable(),

});

const FormCreatehome = ({token, outletOpt, brandOpt, channelOpt, sumberOpt, kategoriOpt, subKategoriOpt, solusiOpt, responsibleDeptOpt}) => {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			store_id: undefined,
			brand_id: undefined,
			channel_id: undefined,
			source: undefined,
			reviewed_at: '',
			ordered_at: null,
			is_valid_home: null,
			is_actionable: null,
			item_names: null,
			rating: null,
      review_category: "warning",
			review_home_category_id: null,
			review_home_sub_category_id: null,
      customer_phone: null,
      customer_name: null,
			solved_at: null,
			review_solution_id: null,
			progress: null,
			review_responsible_department_id: null,
			comment: null,
			external_order_id: null,
		}
	});

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const [isOutletOpen, setIsOutletOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isChannelOpen, setIsChannelOpen] = useState(false);
  const [isKategoriOpen, setIsKategoriOpen] = useState(false);
  const [isSubKategoriOpen, setIsSubKategoriOpen] = useState(false);
  const [isSolusiOpen, setIsSolusiOpen] = useState(false);
  const [isResDeptOpen, setIsResDeptOpen] = useState(false);

  const changeOutlet = useDebouncedCallback((e) => {
    params.set('store', e);
    replace(`${pathname}?${params.toString().replace(/%2C/g, ',')}`);
  }, 350);

  const changeBrand = useDebouncedCallback((e) => {
		if (e === "") {
			params.delete("brand");
			replace(`${pathname}?${params.toString()}`);
		} else {
			params.set("brand", e);
			replace(`${pathname}?${params.toString()}`);
		}
	}, 350);

  const changeChannel = useDebouncedCallback((e) => {
		if (e === "") {
			params.delete("channel");
			setChannelState(undefined);
			replace(`${pathname}?${params.toString()}`);
		} else {
			params.set("channel", e);
			replace(`${pathname}?${params.toString()}`);
		}
	}, 350);

  const handleItem = useDebouncedCallback((val, field) => {
    const items = val.split(",").map((item) => item.trim());
    field.onChange(items)
	}, 350);

  const handleBatal = () => {
    setIsLoading(false)
    router.push('/home')    
  }
  
  const onSubmit = async (values) => {
    setIsLoading(true)
    values.is_valid_home = values.is_valid_home === 'true' ? true : (values.is_valid_home === 'false' ? false : null);
    values.is_actionable = values.is_actionable === 'true' ? true : (values.is_actionable === 'false' ? false : null);
    values.item_names = values.item_names === null ? [] : values.item_names;
    values.solved_at = values.solved_at === '' ? null : values.solved_at;
    values.review_home_category_id = values.review_home_category_id === 'null' ? null : values.review_home_category_id;
    values.review_home_sub_category_id = values.review_home_sub_category_id === 'null' ? null : values.review_home_sub_category_id;
    values.review_solution_id = values.review_solution_id === 'null' ? null : values.review_solution_id;
    values.review_responsible_department_id = values.review_responsible_department_id === 'null' ? null : values.review_responsible_department_id;

    const response = await API.POST('/review', values, token);  

    if (response?.success) {
      setIsLoading(false);
      await customRevalidatePath('/home');
      toast.success("Create successfully.", {position: 'top-right'})
      router.push("/home");
    } else {
      setIsLoading(false);
      toast.error(`Error! ${response.errors[0].detail}`, {position: 'top-right'});
    }
  }

	return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0 sm:space-y-8">
          <div className="grid grid-cols-12 gap-0 sm:gap-6">
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="store_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[14.5px] font-medium">Outlet</FormLabel>
                      <Popover open={isOutletOpen} onOpenChange={setIsOutletOpen}>
                        <PopoverTrigger asChild>
                          <FormControl >
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between font-light", !field.value && "text-muted-foreground")}
                            >
                              {field.value
                                ? outletOpt.find(
                                    (store) => store.id === field.value
                                  )?.name 
                                  : field.value === null ? '-' : "Pilih Outlet"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="PopoverContent p-2 min-w-[130px]">
                          <Command>
                            <CommandInput
                              placeholder="Search outlet..."
                              className="h-9 "
                              onValueChange={changeOutlet}
                            />
                            <CommandEmpty>No outlet found.</CommandEmpty>
                            <CommandGroup className="overflow-auto max-h-[350px]">
                              <CommandItem
                                value="null"
                                onSelect={() => {
                                  form.clearErrors("store_id")
                                  form.setValue("store_id", null)
                                  setIsOutletOpen(false)
                                }}
                              >
                                -
                                <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  (field.value === null) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              </CommandItem>
                              {outletOpt.map(
                                (outlet) => (
                                  (
                                    <CommandItem
                                      value={outlet.name}
                                      key={outlet.id}
                                      onSelect={() => {
                                        form.clearErrors("store_id")
                                        form.setValue("store_id", outlet.id)
                                        setIsOutletOpen(false)
                                      }}
                                    >
                                      {outlet.name}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          outlet.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  )
                                )
                              )}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="brand_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14.5px] font-medium">Brand</FormLabel>
                      <Popover open={isBrandOpen} onOpenChange={setIsBrandOpen}>
                        <PopoverTrigger asChild>
                          <FormControl >
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between font-light", !field.value && "text-muted-foreground")}
                            >
                              {field.value
                                ? brandOpt.find(
                                    (brand) => brand.id === field.value
                                  )?.name 
                                : field.value === null ? '-' : "Pilih Brand"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="PopoverContent p-2 min-w-[130px]">
                          <Command>
                            <CommandInput
                              placeholder="Search brand..."
                              className="h-9 "
                              onValueChange={changeBrand}
                            />
                            <CommandEmpty>No brand found.</CommandEmpty>
                            <CommandGroup className="overflow-auto max-h-[350px]">
                              <CommandItem
                                value="null"
                                onSelect={() => {
                                  form.clearErrors("brand_id")
                                  form.setValue("brand_id", null)
                                  setIsBrandOpen(false)
                                }}
                              >
                                -
                                <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  (field.value === null) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              </CommandItem>
                              {brandOpt.map(
                                (brand) => (
                                  (
                                    <CommandItem
                                      value={brand.name}
                                      key={brand.id}
                                      onSelect={() => {
                                        form.clearErrors("brand_id")
                                        form.setValue("brand_id", brand.id)
                                        setIsBrandOpen(false)
                                      }}
                                    >
                                      {brand.name}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          brand.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  )
                                )
                              )}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 sm:gap-6">
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="channel_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[14.5px] font-medium">Channel</FormLabel>
                      <Popover open={isChannelOpen} onOpenChange={setIsChannelOpen}>
                        <PopoverTrigger asChild>
                          <FormControl >
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between font-light", !field.value && "text-muted-foreground")}
                            >
                              {field.value
                                ? channelOpt.find(
                                    (channel) => channel.id === field.value
                                  )?.name 
                                : field.value === null ? '-' : "Pilih Channel"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="PopoverContent p-2 min-w-[130px]">
                          <Command>
                            <CommandInput
                              placeholder="Search channel..."
                              className="h-9 "
                              onValueChange={changeChannel}
                            />
                            <CommandEmpty>No channel found.</CommandEmpty>
                            <CommandGroup className="overflow-auto max-h-[350px]">
                              <CommandItem
                                value="null"
                                onSelect={() => {
                                  form.clearErrors("channel_id")
                                  form.setValue("channel_id", null)
                                  setIsChannelOpen(false)
                                }}
                              >
                                -
                                <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  (field.value === null) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              </CommandItem>
                              {channelOpt.map(
                                (channel) => (
                                  (
                                    <CommandItem
                                      value={channel.name}
                                      key={channel.id}
                                      onSelect={() => {
                                        form.clearErrors("channel_id")
                                        form.setValue("channel_id", channel.id)
                                        setIsChannelOpen(false)
                                      }}
                                    >
                                      {channel.name}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          channel.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  )
                                )
                              )}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14.5px] font-medium">Sumber</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} >
                        <FormControl>
                          <SelectTrigger className={cn("font-light", !field.value && "text-muted-foreground hover:bg-gray-100 hover:text-black")}>
                          <SelectValue placeholder="Pilih Sumber" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="null">-</SelectItem>
                          {sumberOpt.map(
                            (sumber) => (
                              (<SelectItem key={sumber} value={sumber}>{sumber}</SelectItem>)
                            )
                          )}
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 sm:gap-6">
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="reviewed_at"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[14.5px] font-medium">Tanggal Review</FormLabel>
                      <DateTimePicker paramKeyForm="reviewed_at" form={form}/>   
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="ordered_at"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[14.5px] font-medium">Tanggal Order</FormLabel>
                      <DateTimePicker paramKeyForm="ordered_at" form={form}/>   
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 sm:gap-6">
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="is_valid_home"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-[5px]">Valid Complain</FormLabel>
                      <Select onValueChange={field.onChange} >
                      <SelectTrigger className={cn("font-light", !field.value && "text-muted-foreground hover:bg-gray-100 hover:text-black")}>
                        <SelectValue placeholder={"Pilih Valid Complain"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="null">-</SelectItem>
                        <SelectItem value="true">Valid</SelectItem>
                        <SelectItem value="false">Invalid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
            <FormField
                control={form.control}
                name="is_actionable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-[5px]">Actionable</FormLabel>
                      <Select onValueChange={field.onChange} >
                      <SelectTrigger className={cn("font-light", !field.value && "text-muted-foreground hover:bg-gray-100 hover:text-black")}>
                        <SelectValue placeholder="Pilih Actionable" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="null">-</SelectItem>
                        <SelectItem value="true">Actionable</SelectItem>
                        <SelectItem value="false">Not Actionable</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 sm:gap-6">
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="item_names"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item</FormLabel>
                    <FormControl>
                      <Input placeholder="Isi nama item..." type="name" 
                      onChange={(e) => handleItem(e.target.value, field)}
                      className={cn("font-light", !field.value && "text-muted-foreground hover:bg-gray-100 hover:text-black")}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
            </div>
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
            <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-[5px]">Rating</FormLabel>
                      <Select 
                      onValueChange={val => field.onChange(val !== 'null' ? Number(val) : val === 'null' ? null : val)}
                      >
                      <SelectTrigger className={cn("font-light", !field.value && "text-muted-foreground hover:bg-gray-100 hover:text-black")}>
                        <SelectValue placeholder="Pilih Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="null">-</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 sm:gap-6">
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="review_home_category_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[14.5px] font-medium">Kategori Komplain</FormLabel>
                      <Popover open={isKategoriOpen} onOpenChange={setIsKategoriOpen}>
                        <PopoverTrigger asChild>
                          <FormControl >
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between font-light", !field.value && "text-muted-foreground")}
                            >
                              {field.value === 'null' ? '-' : field.value 
                                ? kategoriOpt.find(
                                    (kategori) => kategori.id === field.value
                                  )?.title 
                                : "Pilih kategori"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="PopoverContent p-2 min-w-[130px]">
                          <Command>
                            <CommandInput
                              placeholder="Search kategori..."
                              className="h-9 "
                            />
                            <CommandEmpty>No kategori found.</CommandEmpty>
                            <CommandGroup className="overflow-auto max-h-[350px]">
                              <CommandItem
                                value="null"
                                onSelect={() => {
                                  form.clearErrors("review_home_category_id")
                                  form.setValue("review_home_category_id", 'null')
                                  setIsKategoriOpen(false)
                                }}
                              >
                                -
                                <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  (field.value === 'null') ? "opacity-100" : "opacity-0"
                                )}
                              />
                              </CommandItem>
                              {kategoriOpt.map(
                                (kategori) => (
                                  (
                                    <CommandItem
                                      value={kategori.title}
                                      key={kategori.id}
                                      onSelect={() => {
                                        form.clearErrors("review_home_category_id")
                                        form.setValue("review_home_category_id", kategori.id)
                                        setIsKategoriOpen(false)
                                      }}
                                    >
                                      {kategori.title}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          kategori.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  )
                                )
                              )}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="review_home_sub_category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14.5px] font-medium">Sub Kategori Komplain</FormLabel>
                      <Popover open={isSubKategoriOpen} onOpenChange={setIsSubKategoriOpen}>
                        <PopoverTrigger asChild>
                          <FormControl >
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between font-light", !field.value && "text-muted-foreground")}
                            >
                             {field.value === 'null' ? '-' : field.value 
                                ? subKategoriOpt.find(
                                    (subKategori) => subKategori.id === field.value
                                  )?.title 
                                : "Pilih sub kategori"}
                              {/* {field.value
                                ? subKategoriOpt.find(
                                    (subKategori) => subKategori.id === field.value
                                  )?.title 
                                : "Pilih Brand"} */}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="PopoverContent p-2 min-w-[130px]">
                          <Command>
                            <CommandInput
                              placeholder="Search sub kategori..."
                              className="h-9 "
                            />
                            <CommandEmpty>No subKategori found.</CommandEmpty>
                            <CommandGroup className="overflow-auto max-h-[350px]">
                              <CommandItem
                                value="null"
                                onSelect={() => {
                                  form.clearErrors("review_home_sub_category_id")
                                  form.setValue("review_home_sub_category_id", 'null')
                                  setIsSubKategoriOpen(false)
                                }}
                              >
                                -
                                <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  (field.value === 'null') ? "opacity-100" : "opacity-0"
                                )}
                              />
                              </CommandItem>
                              {subKategoriOpt.map(
                                (subKategori) => (
                                  (
                                    <CommandItem
                                      value={subKategori.title}
                                      key={subKategori.id}
                                      onSelect={() => {
                                        form.clearErrors("review_home_sub_category_id")
                                        form.setValue("review_home_sub_category_id", subKategori.id)
                                        setIsSubKategoriOpen(false)
                                      }}
                                    >
                                      {subKategori.title}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          subKategori.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  )
                                )
                              )}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 sm:gap-6">
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="customer_phone"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[14.5px] font-medium">No. HP Pelanggan</FormLabel>
                      <Input
                        placeholder="eg. 0812839749"
                        {...field} 
                        className={cn("font-light", !field.value && "text-muted-foreground hover:bg-gray-100 hover:text-black")}
                      />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[14.5px] font-medium">Nama Pelanggan</FormLabel>
                      <Input
                        placeholder="Isi nama pelanggan..."
                        {...field} 
                        className={cn("font-light", !field.value && "text-muted-foreground hover:bg-gray-100 hover:text-black")}
                      />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 sm:gap-6">
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="solved_at"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[14.5px] font-medium">Tanggal Solve</FormLabel>
                      <DateTimePicker paramKeyForm="solved_at" form={form}/>   
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="review_solution_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14.5px] font-medium">Solusi Review</FormLabel>
                      <Popover open={isSolusiOpen} onOpenChange={setIsSolusiOpen}>
                        <PopoverTrigger asChild>
                          <FormControl >
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between font-light", !field.value && "text-muted-foreground")}
                            >
                               {field.value === 'null' ? '-' : field.value 
                                ? solusiOpt.find(
                                    (solusi) => solusi.id === field.value
                                  )?.title 
                                : "Pilih solusi"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="PopoverContent p-2 min-w-[130px]">
                          <Command>
                            <CommandInput
                              placeholder="Search solusi..."
                              className="h-9 "
                            />
                            <CommandEmpty>No solusi found.</CommandEmpty>
                            <CommandGroup className="overflow-auto max-h-[350px]">
                              <CommandItem
                                value="null"
                                onSelect={() => {
                                  form.clearErrors("review_solution_id")
                                  form.setValue("review_solution_id", 'null')
                                  setIsSolusiOpen(false)
                                }}
                              >
                                -
                                <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  (field.value === 'null') ? "opacity-100" : "opacity-0"
                                )}
                              />
                              </CommandItem>
                              {solusiOpt.map(
                                (solusi) => (
                                  (
                                    <CommandItem
                                      value={solusi.title}
                                      key={solusi.id}
                                      onSelect={() => {
                                        form.clearErrors("review_solution_id")
                                        form.setValue("review_solution_id", solusi.id)
                                        setIsSolusiOpen(false)
                                      }}
                                    >
                                      {solusi.title}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          solusi.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  )
                                )
                              )}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 sm:gap-6">
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="progress"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[14.5px] font-medium">Progress</FormLabel>
                      <Input
                        placeholder="Isi progress..."
                        {...field} 
                        className={cn("font-light", !field.value && "text-muted-foreground hover:bg-gray-100 hover:text-black")}
                      />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="review_responsible_department_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14.5px] font-medium">Responsible Department</FormLabel>
                      <Popover open={isResDeptOpen} onOpenChange={setIsResDeptOpen}>
                        <PopoverTrigger asChild>
                          <FormControl >
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-full justify-between font-light", !field.value && "text-muted-foreground")}
                            >
                              {field.value === 'null' ? '-' : field.value 
                                ? responsibleDeptOpt.find(
                                    (resDept) => resDept.id === field.value
                                  )?.title 
                                : "Pilih Responsible Department"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="PopoverContent p-2 min-w-[130px]">
                          <Command>
                            <CommandInput
                              placeholder="Search resDept..."
                              className="h-9 "
                            />
                            <CommandEmpty>No responsible department found.</CommandEmpty>
                            <CommandGroup className="overflow-auto max-h-[350px]">
                              <CommandItem
                                value="null"
                                onSelect={() => {
                                  form.clearErrors("review_responsible_department_id")
                                  form.setValue("review_responsible_department_id", 'null')
                                  setIsResDeptOpen(false)
                                }}
                              >
                                -
                                <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  (field.value === 'null') ? "opacity-100" : "opacity-0"
                                )}
                              />
                              </CommandItem>
                              {responsibleDeptOpt.map(
                                (resDept) => (
                                  (
                                    <CommandItem
                                      value={resDept.title}
                                      key={resDept.id}
                                      onSelect={() => {
                                        form.clearErrors("review_responsible_department_id")
                                        form.setValue("review_responsible_department_id", resDept.id)
                                        setIsResDeptOpen(false)
                                      }}
                                    >
                                      {resDept.title}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          resDept.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  )
                                )
                              )}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 sm:gap-6">
          <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Komentar</FormLabel>
                  <FormControl>
                    <Textarea
                      className={cn("w-full justify-between font-light", !field.value && "text-muted-foreground")}
                      placeholder="Isi komentar..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
              <FormField
                control={form.control}
                name="external_order_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[14.5px] font-medium">Order ID</FormLabel>
                      <Input
                        placeholder="Isi order id..."
                        {...field} 
                        className={cn("font-light", !field.value && "text-muted-foreground hover:bg-gray-100 hover:text-black")}
                      />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <div>
              <Button disabled={isLoading} type='submit'
                className='shadow-lg shadow-primary/50 w-[100px] m-0 p-0'>
                {!isLoading ? (
                  <span >Simpan</span>
                ) : (
                  <span className="mx-2"><Icons.spinner className='h-6 w-8 animate-spin' /></span>
                )}
              </Button>
            </div>
            <div>
              <Button disabled={isLoading} type="text" onClick={handleBatal} variant="outline" className="m-0 p-0 border-gray-400 text-gray-800 px-5">
                <Link asChild href="/home">
                  Batal
                </Link>
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <Toaster 
			 toastOptions={{
				classNames: {
					success: 'text-green-600 bg-[#edfcf2] border-1 border-green-400 text-[14.5px]',
					error: 'text-red-600 bg-[#fbe9e9] border-1 border-red-400 text-[14.5px]',
				},
			  }}
			/>
    </>
	);
};

export default FormCreatehome;