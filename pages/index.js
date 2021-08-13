import Link from 'next/link';
import Head from 'next/head';

export default function Index() {
	return (
		<>
			<Head>
				<title>Start Page Next</title>
				<meta name='keywords' content='next,javascript,nextjs,react' />
				<meta
					name='description'
					content="this is educational project making to Minin's tutorial for next.js"
				/>
				<meta charSet='utf-8' />
			</Head>
			<h1>Helo Next.JS</h1>
			<p>
				<Link href={'/about'}>
					<a>About</a>
				</Link>
			</p>
			<p>
				<Link href='/posts'>
					<a>Posts</a>
				</Link>
			</p>
			<p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
		</>
	);
}
