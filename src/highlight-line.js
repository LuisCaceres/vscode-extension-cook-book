/* The following piece of code highlights the first line of a file. */

const vscode = require('vscode');
const { Position, Range, window } = vscode;

// Constructs a decoration type.
// A decoration type is useful for styling a character, a word, a line, etc.
// It is necessary to keep them in memory.
const decoration = window.createTextEditorDecorationType({
    // This colour is gray.
    backgroundColor: 'rgba(255, 0, 0, 1)'
});

// Constructs a representation of the first line.
const position1 = new Position(0, 0),
    position2 = new Position(0, 100),
    firstLine = new Range(position1, position2);

// Applies styles to the first line.
window.activeTextEditor.setDecorations(decoration, [firstLine]);