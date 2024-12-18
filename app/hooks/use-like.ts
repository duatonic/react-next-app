import useCurrentUser from '@/app/hooks/use-current-user';
import usePost from '@/app/hooks/use-post';
import usePosts from '@/app/hooks/use-posts';
import { useLoginModal } from '@/app/hooks/use-login-modal';
import { useMemo } from 'react';
import { useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);

    const loginModal = useLoginModal();
    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds || [];

        return list.includes(currentUser?.id);
    }, [currentUser?.id, fetchedPost?.likedIds]);

    const toggleLike = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasLiked) {
                request = () => axios.delete('api/like', { data: { postId } });
            }
            else {
                request = () => axios.post('api/like', { postId });
            }

            await request();

            mutateFetchedPost();
            mutateFetchedPosts();

            toast.success(hasLiked ? 'Unliked' : 'Liked');
        }
        catch (error) {
            toast.error('Something went wrong.');
        }
    }, [currentUser, hasLiked, loginModal, postId, mutateFetchedPost, mutateFetchedPosts]);

    return {
        hasLiked,
        toggleLike
    }
};

export default useLike;