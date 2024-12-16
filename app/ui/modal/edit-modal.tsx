import useCurrentUser from '@/app/hooks/use-current-user';
import useUser from '@/app/hooks/useUsers';
import useEditModel from '@/app/hooks/use-edit-model';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import Modal from '@/app/ui/modal/modal';
import ImageUpload from '@/app/ImageUpload';

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModel = useEditModel();

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    }, [currentUser]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            });
            mutateFetchedUser();

            toast.success('Profile updated');

            editModel.onClose();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, [bio, name, profileImage, username, coverImage, editModel, mutateFetchedUser]);

    const bodyContent = ( 
        <div className = "flex flex-col gap-4" >
            <ImageUpload 
                value = {profileImage}
                disabled = {isLoading}
                onChange = {(image) => setProfileImage(image)}
                label = "Upload Profile Image"
            />
            <ImageUpload 
                value = {coverImage}
                disabled = {isLoading}
                onChange = {(image) => setCoverImage(image)}
                label = "Upload Cover Image"
            />
            <input 
            placeholder = "Name"
            onChange = {(e) => setName(e.target.value)}
            value = {name}
            disabled = {isLoading}
            />
            <input
            placeholder = "Username"
            onChange = {(e) => setUsername(e.target.value)}
            value = {username}
            disabled = {isLoading}
            />
            <input
            placeholder = "Bio"
            onChange = {(e) => setBio(e.target.value)}
            value = {bio}
            disabled = {isLoading}
            />
        </div>
    )

    return (<Modal
    disabled={isLoading}
    isOpen={editModel.isOpen}
    title="Edit Profile"
    actionLabel="Save"
    onClose={editModel.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    />);
}
export default EditModal;