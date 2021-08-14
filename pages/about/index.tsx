import Router from 'next/router';
import { MainLayout } from '../../components/MainLayout';
import { MyAbout } from '../../interfaces/about';

interface AboutPageProps {
	title: string;
}

export default function About({ title }: AboutPageProps) {
	return (
		<MainLayout title={'About Page'}>
			<h1>{title}</h1>
			<button onClick={() => Router.push('/')}>Go back to home</button>
			<button onClick={() => Router.push('/posts')}>Go to posts</button>
		</MainLayout>
	);
}

About.getInitialProps = async () => {
	const responce = await fetch('http://localhost:4200/about');
	const data: MyAbout = await responce.json();

	return {
		title: data.title,
	};
};
