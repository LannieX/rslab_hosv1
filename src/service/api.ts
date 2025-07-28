'use server'

import { LoginResponse, TokenResponse } from '@/types/api_type';
import axios, { AxiosResponse } from 'axios';



export const login = async (
  payload: { xcid: string; xmobile: string }
): Promise<LoginResponse> => {
  try {
    const { xcid, xmobile } = payload;

    const response: AxiosResponse<LoginResponse> = await axios.get(
      'https://retrodat.click/salapiengine/api/loginv2',
      {
        params: {
          xcid,
          xmobile,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
  
export const getToken = async (): Promise<string> => {
  try {
    const fixedPayload = {
      username: 'user',
      password: '@123456',
    };

    const response: AxiosResponse<TokenResponse> = await axios.post(
      'https://retrodat.click/salapiengine/api/login',
      fixedPayload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data.token;
  } catch (error) {
    console.error('getToken error:', error);
    throw error;
  }
};

export const getLab = async (
  payload: { hn: string; token: string }
): Promise<unknown> => {
  try {
    const { hn, token } = payload;

    const response: AxiosResponse = await axios.get(
      'https://retrodat.click/salapiengine/api/history',
      {
        params: {
          xhn: hn,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('getLab error:', error);
    throw error;
  }
};
