import React from 'react';
import CommentItem from '@/app/ui/posts/comment-item';

interface commentFeedProps {
    comments?: Record<string, any>[];   
}

const CommentFeed: React.FC<commentFeedProps> = ({ comments = [] }) => {
    return (
        <>
            {comments.map((comment: Record<string, any>) => (
                <CommentItem key={comment.id} data={comment} />
            ))}
        </>
    )
};

export default CommentFeed;