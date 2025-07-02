import useCurrentUser from '@/app/hooks/use-current-user';
import useUsers from '@/app/hooks/use-users';
import { useLoginModal } from '@/app/hooks/use-login-modal';
import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUsers(userId);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        console.log('<use-follow> list:', list);

        return list.includes(userId);
    }, [currentUser?.followingIds, userId]);

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (isFollowing) {
                request = () => axios.delete('/api/follow', { data: userId });
            }
            else {
                request = () => axios.post('/api/follow', { userId });
            }

            await request();

            mutateCurrentUser();
            mutateFetchedUser();

            toast.success(isFollowing ? 'Unfollowed' : 'Followed');
        }
        catch (error) {
            toast.error('Something went wrong.');
        }
    }, [ currentUser, isFollowing, loginModal, userId, mutateCurrentUser, mutateFetchedUser ]);

    return {
        isFollowing,
        toggleFollow
    }
};

export default useFollow;