import { Get } from '../request/server';

export const getUserInfo = async (userId) => 
  Get('/api/user', { userId });

export const getUserByEmail = async (email) => 
  Get('/api/user/email', { email });
