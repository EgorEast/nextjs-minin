import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MainLayout } from '../components/MainLayout';

export default function Posts({ posts: serverPosts }) {
	const [posts, setPosts] = useState(serverPosts);
	useEffect(() => {
		async function load() {
			const responce = await fetch('http://localhost:4200/posts');
			const data = await responce.json();
			setPosts(data);
		}
		if (!serverPosts) load();
	}, []);

	if (!posts)
		return (
			<MainLayout>
				<p>Loading...</p>
			</MainLayout>
		);
	return (
		<MainLayout title={'Posts Page'}>
			<h1>Posts Page</h1>
			<ul>
				{posts.map((post) => (
					<li key={`title-${post.id}`}>
						<Link href={`/post/[id]`} as={`/post/${post.id}`}>
							<a>{post.title}</a>
						</Link>
					</li>
				))}
			</ul>
		</MainLayout>
	);
}

Posts.getInitialProps = async ({ req }) => {
	if (!req) {
		return { posts: null };
	}
	const responce = await fetch('http://localhost:4200/posts');
	const posts = await responce.json();
	return { posts };
};

// export async function getServerSideProps({ req }) {
// 	if (!req) {
// 		return { posts: null };
// 	}
// 	const responce = await fetch('http://localhost:4200/posts');
// 	const posts = await responce.json();
// 	return { props: { posts } };
// }
