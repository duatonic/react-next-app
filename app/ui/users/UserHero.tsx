import Image from 'next/image';

import useUsers from '@/app/hooks/use-users';

import Avatar from '@/app/ui/avatar';

interface UserHeroProps {
    userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
    const { data: fetchedUser } = useUsers(userId);

    return (
        <div>
            <div className="bg-neutral-700 h-44 relative">
                {fetchedUser?.coverImage && (
                    <Image 
                    src={fetchedUser.coverImage}
                    fill
                    alt="cover Image"
                    style={{ objectFit: 'cover'}}
                    />
                )}
                <div className="absolute -bottom-16 left-4">
                    <Avatar userId={userId} isLarge hasBorder />
                </div>
            </div>
        </div>
    );
};

export default UserHero;