"use client";
import React, {useState} from "react";
import { API } from '@/config';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { convDateToString } from "@/lib/helper";
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { customRevalidatePath } from "@/lib/action";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  birth_date: z.date({
    required_error: "Birth date is required.",
  }),
});

const FormAddUser = ({}) => {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
      name: null,
      email: null,
		}
	});

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleBatal = () => {
    router.push('/home')    
  }

  const onEmailCheck = useDebouncedCallback(async (val) => {
    var validEmail = /^\S+@\S+\.\S+$/;

    if(val.match(validEmail)){
      setValidationError('');
    } else{
      form.setValue("email", val)
      setValidationError('invalid email');
    }
  }, 350);
  
  const onSubmit = async (values) => {
    setIsLoading(true)
    values.birth_date = convDateToString(values.birth_date);
    // console.log(values)

    const response = await API.POST('/users', values, null);  
    // console.log(response)

    if (response.meta.code === 200) {
      setIsLoading(false);
      await customRevalidatePath('/home');
      toast.success(response.meta.message, {position: 'top-right'})
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
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[14.5px] font-medium">Nama User</FormLabel>
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
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email address..."
                      onChangeCapture={e => onEmailCheck(e.currentTarget.value)}
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  {validationError ? <FormMessage>{validationError}</FormMessage> : <FormMessage/>}
                </FormItem>
              )}
            />
            </div>
            <div className="md:col-span-6 col-span-12 pb-7 sm:pb-0">
            <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-[5px]">Birth Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select a birth date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) =>  date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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

export default FormAddUser;