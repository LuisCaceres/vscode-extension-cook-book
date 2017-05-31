/* The following piece of code makes the first line of code read only in any file in the root folder. */

const vscode = require('vscode');
const { commands, workspace } = vscode;

/** Prevents edition of a document.
 * @listens edition of a file (such as inserting a character or removing a line among others).
 */
function preventEdition() {
    // Discards the edition by executing the undo command.
    commands.executeCommand('undo');
}

// listens for any edits in any files in the root folder 
workspace.onDidChangeTextDocument(preventEdition);