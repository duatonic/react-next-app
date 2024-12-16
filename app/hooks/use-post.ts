import useSWR from 'swr';
import fetcher from '@/app/lib/fetcher';

const usePost = (postId: string) => {
    const url = postId ? `/api/posts/${postId}` : null;

    
    const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 5000
    });

    console.log('<use-post> da data:', data);
    
    return {
        data,
        error,
        isLoading,
        mutate
    };
}

export default usePost;