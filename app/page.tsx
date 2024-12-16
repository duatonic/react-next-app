import Header from '@/app/ui/header';
import Form from '@/app/ui/form';
import PostFeed from '@/app/ui/posts/postFeed'; 

export default function Page() {
  return (
    <>
      <Header name="Home" />
      <Form placeholder="What's happening?" />
      { <PostFeed /> }
    </>
  );
}
