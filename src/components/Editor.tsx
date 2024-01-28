import { useState } from 'react'
import ReactMde from 'react-mde'
import Showdown from 'showdown'

export interface IEditor {
	tempNoteText: string
	setTempNoteText: React.Dispatch<React.SetStateAction<string>>
}

const Editor: React.FC<IEditor> = ({ tempNoteText, setTempNoteText }) => {
	const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')

	const converter = new Showdown.Converter({
		tables: true,
		simplifiedAutoLink: true,
		strikethrough: true,
		tasklists: true
	})

	return (
		<section className='pane editor'>
			<ReactMde
				value={tempNoteText}
				onChange={setTempNoteText}
				selectedTab={selectedTab}
				onTabChange={setSelectedTab}
				generateMarkdownPreview={markdown =>
					Promise.resolve(converter.makeHtml(markdown))
				}
				minEditorHeight={80}
				heightUnits='vh'
			/>
		</section>
	)
}

export default Editor
