import { json, redirect } from '@remix-run/node'
import { getStoredNotes, storeNotes } from '~/data/notes'
import NewNote, { links as newNoteLinks } from '~/components/NewNote'
import NoteList, { links as noteListLinks } from '~/components/NoteList'
import { Link, useCatch, useLoaderData } from '@remix-run/react'

export default function Notes() {
	const notes = useLoaderData()

	return (
		<main>
			<NewNote />
			<NoteList notes={notes} />
		</main>
	)
}

export async function loader() {
	const notes = await getStoredNotes()

	if (!notes || notes.length === 0) {
		throw json(
			{ message: "Couldn't find any notes" },
			{ status: 404, statusText: 'Not Found' }
		)
	}

	return notes
}

// This action will handle the form submission
export async function action({ request }) {
	const formData = await request.formData()
	const noteData = Object.fromEntries(formData)

	// Add validation
	if (noteData.title.trim().length < 5) {
		return { message: 'Invalid title - must be at least 5 characters!' }
	}

	const existingNotes = await getStoredNotes()
	noteData.id = new Date().toISOString()
	const updatedNotes = existingNotes.concat(noteData)
	// await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000))
	await storeNotes(updatedNotes)

	return redirect('/notes')
}

export function meta() {
	return {
		title: 'All Notes',
		description: 'A list of all notes',
	}
}

export function links() {
	return [...newNoteLinks(), ...noteListLinks()]
}

export function CatchBoundary() {
	const caughtResponse = useCatch()

	const message = caughtResponse.data.message || 'Data not found'

	return (
		<main>
			<NewNote />
			<p className='info-message'>{message}</p>
		</main>
	)
}

export function ErrorBoundary({ error }) {
	return (
		<main className='error'>
			<h1>An error related to your notes occurred!</h1>
			<p>{error.message}</p>
			<p>
				Back to <Link to='/'>safety!</Link>
			</p>
		</main>
	)
}
