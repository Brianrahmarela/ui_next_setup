'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Icons } from '../ui/icons';
import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { Button } from '@/components/ui/button';
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { API } from '@/config';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';

const formSchema = z.object({
  username: z.string(),
  password: z.string().min(4),
  remember_me: z.boolean().default(false).optional(),
});

export default function FormLogin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      remember_me: true,
    },
  });

  useEffect(() => {
    let dataCookieUsername = getCookie('username')
    let dataCookiePassword = getCookie('password')
    if (dataCookieUsername && dataCookieUsername) {
      let bytesUsername = CryptoJS.AES.decrypt(dataCookieUsername, 'secret key 123');
      let decryptedDataUsername = JSON.parse(
        bytesUsername.toString(CryptoJS.enc.Utf8)
      );
      form.setValue('username', String(decryptedDataUsername));

      let bytesPassword = CryptoJS.AES.decrypt(
        dataCookiePassword,
        'secret key 123'
      );
      let decryptedDataPassword = JSON.parse(
        bytesPassword.toString(CryptoJS.enc.Utf8)
      );
      form.setValue('password', String(decryptedDataPassword));
    }
  }, []);

  const onSubmit = async (values) => {
    setIsLoading(true);
    if (values.remember_me) {
      let encryptedDataUsername = CryptoJS.AES.encrypt(
        JSON.stringify(values.username),
        'secret key 123'
      ).toString();
      setCookie('username', encryptedDataUsername, {maxAge: 60 * 60 * 24 });
      let encryptedDataPass = CryptoJS.AES.encrypt(
        JSON.stringify(values.password),
        'secret key 123'
      ).toString();
      setCookie('password', encryptedDataPass, {maxAge: 60 * 60 * 24 });
    } else {
      deleteCookie('username');
      deleteCookie('password');
    }

    const response = await API.POST('/auth/login', values);

    if (response.meta.status === 200) {
      await setCookie('access_token', response.data.content[0].token, {maxAge: 60 * 60 * 24 });
      window.location.reload();
    } else {
      showToast(response?.meta?.message);
      setIsLoading(false);
    }
  };
  const showToast = (msgErr) => {
    toast({
      variant: 'destructive',
      title: 'Error!',
      description: `${msgErr}`,
      action: <ToastAction altText='Try again'>Try again</ToastAction>,
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-6'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder='username...'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Password...'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between'>
            <div>
              <FormField
                control={form.control}
                name='remember_me'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-2 space-y-0 '>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Remember me</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            disabled={isLoading}
            type='submit'
            className='w-full text-md font-semibold shadow-lg shadow-primary/50'
          >
            {!isLoading ? (
              'Login'
            ) : (
              <Icons.spinner className='mr-2 h-6 w-8 animate-spin' />
            )}
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
}