'use client';
import { useCallback } from "react";

import useUsers from "@/app/hooks/use-users";
import { useRouter } from "next/navigation";
import Image from 'next/image';

interface avatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}

const Avatar: React.FC<avatarProps> = ({
    userId,
    isLarge,
    hasBorder
 }) => { 
    const router = useRouter();
    const { data: fetchedUser } = useUsers(userId);
    // console.log('<avatar> fetchedUser:', fetchedUser);
    

    const onClick = useCallback((event: any) => {
        event.stopPropagation();

        const url = `/users/${userId}`;

        router.push(url);
    }, [router, userId]);

    return ( 
        <div
            className={`
                ${hasBorder ? 'border-4 border-black' : ''}
                ${isLarge ? 'h-32' : 'h-12'}
                ${isLarge ? 'w-32' : 'w-12'}
                rounded-full
                hover:opacity-90
                transition
                cursor-pointer
                relative
            `}
        >
            <Image
                fill
                style={{
                    objectFit: 'cover',
                    borderRadius: '100%'
                }}
                alt="avatar"
                onClick={onClick}
                src={fetchedUser?.profileImage || `/images/pexels-connor-danylenko-2538122.jpg`}
            />
        </div>
    );
};

export default Avatar;