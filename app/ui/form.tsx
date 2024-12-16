"use client";

import useCurrentUser from '@/app/hooks/use-current-user'
import { useLoginModal } from '@/app/hooks/use-login-modal'
import usePosts from '@/app/hooks/use-posts'
import useRegisterModal from '@/app/hooks/use-register-modal'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Button from './button'
import Avatar from './avatar'

interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { mutate: createPost } = usePosts();

    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.post('/api/posts', { body });

            toast.success('Tweet posted');

            setBody('');
            mutatePosts();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts]);

    return (
        <div className="border-b-[1-px] border-neutral-800 px-5 py-2">
            {currentUser ? (
                <div className="flex flex-row gap-4">
                    <div>
                        <Avatar userId={currentUser.id} />
                    </div>
                    <div className="w-full">
                        <textarea
                            disabled={isLoading}
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                            className="
                            disabled:opacity-80
                            peer
                            resize-none
                            mt-3
                            w-full
                            bg-black
                            ring-0
                            outline-none
                            text-[20px]
                            placeholder-neutral-500
                            text-white"

                            placeholder={placeholder}
                        >
                            <hr 
                            className="
                            opacity-0
                            peer-focus:opacity-100
                            h-[1px]
                            w-full
                            border-neutral-800
                            transition
                            "/>
                        </textarea>
                        <div className="mt-4 flex flex-row justify-end">
                            <Button
                                disabled={isLoading || !body}
                                onClick={onSubmit}
                                label="Tweet"/>
                        </div>
                    </div>
                </div>

            ) : (
            <div className="py-8">
                <h1 
                className="
                text-white
                text-2xl
                text-center
                mb-4
                font-bold"
                >Welcome to twitter</h1>
                <div className="flex flex-row items-center justify-center gap-4">
                    <Button label="Login" onClick={loginModal.onOpen}/>
                    <Button label="Register" onClick={registerModal.onOpen}/>
                </div>
            </div>
            )}
        </div>
    );
}

export default Form;

function mutatePosts() {
    throw new Error('Function not implemented.')
}
