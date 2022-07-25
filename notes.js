const chalk = require('chalk')
const fs = require('fs')
const { title } = require('process')

const addNote = (title, body) => {
	const notes = loadNotes()
	const duplicateNotes = notes.find(note => note.title === title)
	if (!duplicateNotes) {
		notes.push({
			title,
			body
		})
		saveNotes(notes)
		console.log(chalk.inverse.green('Note added!'))
	} else {
		console.log(chalk.inverse.red('This title already exists!'))
	}
}

const removeNote = (title) => {
	const notes = loadNotes()
	const keepNotes = notes.filter(note => note.title !== title)
	if (notes.length > keepNotes.length) {
		saveNotes(keepNotes)
		console.log(chalk.inverse.green('Note removed!'))
	} else {
		console.log(chalk.inverse.red('No note found!'))
	}
}

const listNotes = () => {
	const notes = loadNotes()
	console.log(chalk.inverse('Your notes:'))
	notes.forEach(note => {
		console.log(note.title)
	});
}

const readNote = (title) => {
	const notes = loadNotes()
	const foundNote = notes.find(note => note.title === title)
	if (foundNote) {
		console.log(chalk.underline(`${foundNote.title}:`))
		console.log(foundNote.body)
	} else {
		console.log(chalk.inverse.red(`No note by the title of "${title}"`))
	}
}

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch (e) {
		return []
	}
}

module.exports = {
	addNote,
	removeNote,
	listNotes,
	readNote
}