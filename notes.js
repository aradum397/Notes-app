const chalk = require('chalk')
const fs = require('fs')

const getNotes = function () {
	return 'Your notes...'
}

const addNote = function (title, body) {
	const notes = loadNotes()
	const duplicateNotes = notes.filter(note => note.title === title)
	if (duplicateNotes.length === 0) {
		notes.push({
			title,
			body
		})
		saveNotes(notes)
		console.log(chalk.green('Note added!'))
	} else {
		console.log(chalk.red('This title already exists!'))
	}
}

const deleteNote = function (title) {const notes = loadNotes()
	const keepNotes = notes.filter(note => note.title !== title)
	if (notes.length > keepNotes.length) {
		saveNotes(keepNotes)
		console.log(chalk.green('Note removed!'))
	} else {
		console.log(chalk.red('No note found!'))
	}
}

const saveNotes = function (notes) {
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
	try {
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch (e) {
		return []
	}
}

module.exports = {
	getNotes,
	addNote,
	deleteNote
}