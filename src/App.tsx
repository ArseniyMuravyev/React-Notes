import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Split from 'react-split'
import { db, notesCollection } from '../firebase'
import Editor from './components/Editor'
import Sidebar, { INote } from './components/Sidebar'

interface AppProps {}

const App: React.FC<AppProps> = () => {
	const [notes, setNotes] = useState<INote[]>([])
	const [currentNoteId, setCurrentNoteId] = useState<string>('')
	const [tempNoteText, setTempNoteText] = useState<string>('')

	const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]

	const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

	useEffect(() => {
		const unsubscribe = onSnapshot(notesCollection, snapshot => {
			const notesArr = snapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id
			})) as INote[]
			setNotes(notesArr)
		})
		return unsubscribe
	}, [])

	useEffect(() => {
		if (!currentNoteId) {
			setCurrentNoteId(notes[0]?.id)
		}
	}, [notes])

	useEffect(() => {
		if (currentNote) {
			setTempNoteText(currentNote.body)
		}
	}, [currentNote])

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (tempNoteText !== currentNote.body) {
				updateNote(tempNoteText)
			}
		}, 500)
		return () => clearTimeout(timeoutId)
	}, [tempNoteText])

	async function createNewNote() {
		const newNote = {
			body: "# Type your markdown note's title here",
			createdAt: Date.now(),
			updatedAt: Date.now()
		}
		const newNoteRef = await addDoc(notesCollection, newNote)
		setCurrentNoteId(newNoteRef.id)
	}

	async function updateNote(text: string) {
		const docRef = doc(db, 'notes', currentNoteId)
		await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true })
	}

	async function deleteNote(noteId: string) {
		const docRef = doc(db, 'notes', noteId)
		await deleteDoc(docRef)
	}

	return (
		<main>
			{notes.length > 0 ? (
				<Split sizes={[30, 70]} direction='horizontal' className='split'>
					<Sidebar
						notes={sortedNotes}
						currentNote={currentNote}
						setCurrentNoteId={setCurrentNoteId}
						newNote={createNewNote}
						deleteNote={deleteNote}
					/>
					<Editor
						tempNoteText={tempNoteText}
						setTempNoteText={setTempNoteText}
					/>
				</Split>
			) : (
				<div className='no-notes'>
					<h1>You have no notes</h1>
					<button className='first-note' onClick={createNewNote}>
						Create one now
					</button>
				</div>
			)}
		</main>
	)
}

export default App
