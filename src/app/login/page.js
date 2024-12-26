import React from 'react';
import FormLogin from '@/components/login/form-login';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const Login = async () => {
  return (
    <div className=' flex flex-col justify-center  items-center h-screen '>

      <Card className='max-w-md w-full shadow-none md:shadow-lg p-4 rounded-lg border-0 md:border-[1px] md:border-gray-100'>
        <CardHeader>
          <CardTitle className='font-bold text-lg'>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <FormLogin />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
