'use client';

import useSWR from 'swr';
import fetcher from '@/app/lib/fetcher';

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

    console.log('<use-current-user> da data:', data);

    return {
        data,
        error,
        isLoading,
        mutate
    };
}

export default useCurrentUser;