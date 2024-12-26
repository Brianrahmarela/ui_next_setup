import React from 'react'
import { API } from '@/config';
import { cookies } from 'next/headers';
import RefreshToken from '@/config/refreshToken';

const getProfile = async (token) => {
  const response = await API.GET('/me', token);
  return response;
};

const Dashboard = async () => {
  const token = cookies().get('access_token')?.value;
  const data = await getProfile(token);

  if (!data.success) {
    return <RefreshToken />;
  }
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard