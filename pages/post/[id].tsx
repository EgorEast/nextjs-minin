import { useEffect, useState } from 'react';
import { MainLayout } from '../../components/MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { MyPost } from '../../interfaces/post';

interface PostPageProps {
	post: MyPost;
}

export default function Post({ post: serverPost }: PostPageProps) {
	const [post, setPost] = useState(serverPost);
	const router = useRouter();
	useEffect(() => {
		async function load() {
			const responce = await fetch(
				`${process.env.API_URL}/posts/${router.query.id}`
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

interface PostNextPageContext extends NextPageContext {
	query: {
		id: string;
	};
}

Post.getInitialProps = async ({ query, req }: PostNextPageContext) => {
	if (!req) {
		return { post: null };
	}
	const responce = await fetch(`http://localhost:4200/posts/${query.id}`);
	const post: MyPost = await responce.json();
	return { post };
};

// export async function getServerSideProps({ query }) {
// 	const responce = await fetch(`http://localhost:4200/posts/${query.id}`);
// 	const post = await responce.json();
// 	return { props: { post } };
// }
