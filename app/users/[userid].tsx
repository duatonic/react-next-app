import Header from '@/app/ui/Header';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import useUsers from '@/app/hooks/useUsers';
import UserHero from '@/app/ui/UserHero';
import UserBio from '@/app/ui/UserBio';

const UserView = () => {
    const router = useRouter();
    const { userId } = router.query;

    const { data: fetchedUser, isLoading } = useUsers(userId as string);

    if(isLoading || !fetchedUser){
        return (
            <div  className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        );
    }

    return ( 
        <>
            <Header showBackArrow label={fetchedUser?.name} />
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
        </>
    );
}

export default UserView;