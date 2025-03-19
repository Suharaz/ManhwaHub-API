"use server"
import { cookies } from 'next/headers'

export const getAuthToken = () => {
    const cookieStore = cookies();
    return cookieStore.get('token');
};

export const deleteAuthToken = () => {
    const cookieStore = cookies();
    cookieStore.delete('token');
};