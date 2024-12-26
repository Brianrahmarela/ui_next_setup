'use client';

import { customRevalidatePath } from '@/lib/action';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';
// import LoadingMenu from '@/app/menu/loading';
import { usePathname } from "next/navigation";
import { API } from '.';
import Loading from '@/components/dashboard/loading';

const RefreshToken = () => {
  const accessToken = getCookie('access_token');

  // const refreshToken = getCookie('refresh_token');
  // const accessTokenEmailDecode = jwt.decode(accessToken)?.email;
  // const path = usePathname();

  const fetchData = async () => {
    deleteCookie('access_token');
    // deleteCookie('refresh_token');
    window.location.reload();
    // const payload = {
    //   email: accessTokenEmailDecode,
    // };
    // const response = await API.POST('/refresh-token', payload, refreshToken);
    // if (response.meta?.message === 'success') {
    //   setCookie('access_token', response.data.content[0]?.access_token);
    //   customRevalidatePath('/:path*');
    // } else if (response.meta?.message === 'data not found') {
    //   return;
    // } else {
    //   deleteCookie('access_token');
    //   window.location.reload();
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // return (path === '/home' ? <p>Loading</p> : <Loading/>);
};

export default RefreshToken;
