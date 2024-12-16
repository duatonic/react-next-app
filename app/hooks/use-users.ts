'use client';

import useSWR from 'swr';
import fetcher from '@/app/lib/fetcher';

const useUsers = (userId?: string) => {
    const url = userId ? `/api/users/${userId}` : '/api/users';
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    // console.log('<use-users> da userId:', userId);
    // console.log('<use-users> da url:', url);
    console.log('<use-users> da data:', data);

    return {
        data,
        error,
        isLoading,
        mutate
    };
}

export default useUsers;