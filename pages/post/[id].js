import { useEffect, useState } from 'react';
import { MainLayout } from '../../components/MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Post({ post: serverPost }) {
	const [post, setPost] = useState(serverPost);
	const router = useRouter();
	useEffect(() => {
		async function load() {
			const responce = await fetch(
				`http://localhost:4200/posts/${router.query.id}`
			);
			const data = await responce.json();
			setPost(data);
		}
		if (!serverPost) load();
	}, []);

	if (!post)
		return (
			<MainLayout>
				<p>Loading...</p>
			</MainLayout>
		);

	return (
		<MainLayout title={post?.title}>
			<h1>{post?.title ?? `Post not found`}</h1>
			<hr />
			<p>{post?.body ?? null}</p>
			<Link href='/posts'>
				<a>Back to all Posts</a>
			</Link>
		</MainLayout>
	);
}

Post.getInitialProps = async ({ query, req }) => {
	if (!req) {
		return { post: null };
	}
	const responce = await fetch(`http://localhost:4200/posts/${query.id}`);
	const post = await responce.json();
	return { post };
};
