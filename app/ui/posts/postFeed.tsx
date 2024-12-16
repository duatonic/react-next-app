"use client";
import usePost from '@/app/hooks/use-posts'
import PostItem from '@/app/ui/posts/postItem'

interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: post = [] } = usePost(userId);
    return (
    <>
        {post.map((post: Record<string, any>) => (
            <PostItem
                userId={userId}
                key={post.id}
                data={post}
            />
        ))}
    </>
    );
}

export default PostFeed;