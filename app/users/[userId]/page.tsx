import Header from '@/app/ui/header';
import { usePathname } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import useUsers from '@/app/hooks/use-users';
import UserHero from '@/app/ui/users/UserHero';
import UserBio from '@/app/ui/users/UserBio';

export function UserView() {
    // const router = useRouter();
    // const { userId } = router.query;
    const pathname = usePathname();
    const userId = pathname.split('/').pop();


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
            <Header showBackArrow name={fetchedUser?.name} />
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
        </>
    );
}