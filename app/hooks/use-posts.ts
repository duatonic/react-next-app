'use client';

import useSWR from 'swr';
import fetcher from '@/app/lib/fetcher';

const usePosts = (userId?: string) => {
    const url = userId ? `/api/posts?userId=${userId}` : '/api/posts';
    
    const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 5000
    });

    // console.log('<use-posts> da data:', data);
    
    return {
        data,
        error,
        isLoading,
        mutate
    };
}

export default usePosts;