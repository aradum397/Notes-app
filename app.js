const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

// Customize yargs version
yargs.version('1.0')

// Create add command
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: "Provide a title for your note",
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: "Provide a body of text for your note",
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.addNote(argv.title, argv.body)
	}
})

// Create remove command
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: "Provide a title for your note",
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.removeNote(argv.title)
	}
})

// Create list command
yargs.command({
	command: 'list',
	describe: 'List existing notes',
	handler: function () {
		console.log("Here are your notes:")
	},
	handler() {
		notes.listNotes()
	}
})

// Create read command
yargs.command({
	command: 'read',
	describe: 'Read a note',
	handler: function () {
		console.log("Reading note!")
	},
	builder: {
		title: {
			describe: "Provide a title for your note",
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.readNote(argv.title)
	}
})

yargs.parse()