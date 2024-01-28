export interface INote {
	id: string
	body: string
	updatedAt: number
	createdAt: number
}

interface ISidebar {
	notes: INote[]
	currentNote: INote
	setCurrentNoteId: React.Dispatch<React.SetStateAction<string>>
	deleteNote: (noteId: string) => void
	newNote: () => void
}

const Sidebar: React.FC<ISidebar> = ({
	notes,
	currentNote,
	setCurrentNoteId,
	deleteNote,
	newNote
}) => {
	const noteElements = notes.map(note => (
		<div key={note.id}>
			<div
				className={`title ${note.id === currentNote.id ? 'selected-note' : ''}`}
				onClick={() => setCurrentNoteId(note.id)}
			>
				<h4 className='text-snippet'>{note.body.split('\n')[0]}</h4>
				<button className='delete-btn'>
					<img src='/trash.svg' onClick={() => deleteNote(note.id)} />
				</button>
			</div>
		</div>
	))

	return (
		<section className='pane sidebar'>
			<div className='sidebar--header'>
				<h3>Notes</h3>
				<button className='new-note' onClick={newNote}>
					+
				</button>
			</div>
			{noteElements}
		</section>
	)
}

export default Sidebar