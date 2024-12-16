'use client';

import { useState, useCallback } from 'react';
import { useLoginModal } from '@/app/hooks/use-login-modal';
import { useRegisterModal } from '@/app/hooks/use-register-modal';
import Input from '@/app/ui/input';
import Modal from '@/app/ui/modal/modal';
import { signIn } from 'next-auth/react';

export default function LoginModal() {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();
    }, [isLoading, loginModal, registerModal]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if (result?.ok) {
                console.log('Successfully signed in!');
                loginModal.onClose();
            } else {
                console.log('Sign in failed:', result?.error);
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }, [loginModal, email, password]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>
                Don&apos;t have an account?{' '}
                <span
                    onClick={onToggle}
                    className="text-white cursor-pointer hover:underline"
                >
                    Sign up
                </span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Sign in to Chirper"
            actionLabel="Sign in"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
}