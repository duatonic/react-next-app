import { usePathname } from 'next/navigation';
import usePost from '@/app/hooks/use-post';
import { ClipLoader } from 'react-spinners';
import Header from '@/app/ui/header';
import PostItem from '@/app/ui/posts/PostItem';

export default function PostView() {
    const pathname = usePathname();
    const postId = pathname.split('/').pop();

    const { data: fetchedPost, isLoading } = usePost(postId as string);

    if (isLoading || !fetchedPost) {
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader color="LightBlue" size={80}  />
            </div>
        )
    }
    
    return (
        <>
            <Header name="Chirp" showBackArrow />
            <PostItem data={fetchedPost} />
            <Form postId={postId as string} isComment placeholder="Chirp your reply" />
        </>
    );
};