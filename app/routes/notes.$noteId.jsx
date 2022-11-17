import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getStoredNotes } from '~/data/notes'
import styles from '~/styles/note-details.css'

export default function NoteDetailsPage() {
	const { title, content } = useLoaderData()

	return (
		<main id='note-details'>
			<header>
				<Link to='/notes'>Back to all notes</Link>
			</header>
			<h1>{title}</h1>
			<p id='note-details-content'>{content}</p>
		</main>
	)
}

export async function loader({ params }) {
	const notes = await getStoredNotes()
	const selectedNote = notes.find((note) => note.id === params.noteId)

	if (!selectedNote) {
		throw json(
			{ message: 'Could not find the note for this id: ' + params.noteId },
			{ status: 404 }
		)
	}

	return selectedNote
}

export function links() {
	return [{ rel: 'stylesheet', href: styles }]
}

export function meta({ data }) {
	return {
		title: data.title,
		description: data.content,
	}
}
