import Router from 'next/router';

export default function About() {
	return (
		<>
			<h1>About Page</h1>
			<button onClick={() => Router.push('/')}>Go back to home</button>
			<button onClick={() => Router.push('/posts')}>Go to posts</button>
		</>
	);
}
