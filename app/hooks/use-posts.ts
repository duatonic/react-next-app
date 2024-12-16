import fetcher from '@/app/lib/fetcher';
import useSWR from 'swr';

const usePost = (userId?: string) => {
    const url = userId ? '/api/posts?userId=' + userId : '/api/posts';

    const {
        data,
        error,
        isLoading,
        mutate
    } = useSWR(url, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default usePost;



