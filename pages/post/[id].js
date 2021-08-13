import { useRouter } from 'next/router';
// import { useRouter } from 'next/dist/client/router';

export default function Post() {
	const router = useRouter();
	return (
		<>
			<h1>Post {router.query.id}</h1>
		</>
	);
}
