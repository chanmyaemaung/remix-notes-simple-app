import { Link } from '@remix-run/react'

import homeStyles from '~/styles/home.css'

export default function Index() {
	return (
		<main id='content'>
			<h1>Programming Is My Passion</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, dicta.
			</p>
			<p id='cta'>
				<Link to='/notes'>Try Now!</Link>
			</p>
		</main>
	)
}

export function links() {
	return [{ rel: 'stylesheet', href: homeStyles }]
}
