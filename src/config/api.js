'use server';

import axios from 'axios';

export const GET = async (path, token, params) => {
  console.log('url API GET: ', path)

  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || null}`,
  };
  console.log('params API GET ==>', params)
  
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
      {
        headers: header,
        params,
      }
    );
    console.log('response API GET: ', response.data)

    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};


export const POST = async (path, data, token) => {
  console.log('url API POST: ', path)

  if (data.remember_me !== undefined) {
    let { remember_me, ...newData } = data;
    data = newData;
  }
  console.log('params API POST ==>', data)

  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || null}`,
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
      data,
      {
        headers: header,
      }
    );
    console.log('response API POST: ', response)

    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const PATCH = async (path, id, data, token) => {
  console.log('url API PATCH: ', path)

  console.log('params API PATCH ==>', data)
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || null}`,
  };

  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}/${id}`,
      data,
      {
        headers: header,
      }
    );
    console.log('response API PATCH: ', response)

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};