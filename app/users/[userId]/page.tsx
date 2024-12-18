'use client';

import Header from '@/app/ui/header';
import { useParams } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import useUsers from '@/app/hooks/useUsers';
import UserHero from '@/app/ui/users/UserHero';
import UserBio from '@/app/ui/users/UserBio';
import PostFeed from '@/app/ui/posts/postFeed';

const UserView = () => {
    const { userId } = useParams();

    console.log('<userview> da userId:', userId);

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
            <PostFeed userId={userId as string}/>
        </>
    );
}

export default UserView;