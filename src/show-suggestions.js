/* The following recipe shows completion suggestions through Intellisense. */

// Load the Node.js path module which works with file paths.
const path = require('path');

// Load the VS Code API in order to interact with VS Code.
const vscode = require('vscode');
const { CompletionItem, languages, workspace } = vscode;

// Specify under which conditions this code will run.
const LANGUAGE = 'html';

// Specify that only JavaScript files will be shown as completion suggestions.
const GLOB_PATTERN = '**/*.js';

// Specify that completion suggestions will be shown when the caret is positioned right after the opening double quotation mark of the src attribute in a script tag (e.g. <script src="|"><script>).
const script = /^<script\ssrc="$/;

// Create an empty list of completion suggestions.
const completionItems = [];

// Specify these completion suggestions will have a file icon.
const kind = 16;

// Construct a completion item provider.
const provider = {
    provideCompletionItems(document, position) {
        // Get the line on which the caret is positioned.
        const line = document.lineAt(position);
        // Get the character number of the first non-whitespace character on that line.
        const START = line.firstNonWhitespaceCharacterIndex;
        // Get the substring delimited by that character number and the current position of the caret. 
        const STRING = line.text.slice(START, position.character);

        // If the caret turns out to be positioned right after the first double quotation mark of the src attribute in a script tag.
        if (STRING.match(script)) {
            // Display completion suggestions to the developer.
            return completionItems;
        }
    }
}

// Make the completion item provider available on VS Code.
languages.registerCompletionItemProvider(LANGUAGE, provider, ['']);

// Look for all JavaScript files within the root folder.
workspace.findFiles(GLOB_PATTERN)
    // Process the JavaScript files once found.
    .then(processFiles);

/** Process the JavaScript files once found.
 * @param {[URI]} files - 
 */
function processFiles(files) {
    // For each file found.
    for (let file of files) {
        // Extract only the name and the file extension.
        file = path.basename(file._fsPath);
        // Create a completion suggestion.
        let completionItem = new CompletionItem(file, kind);
        // Add to the list of completion sugestions.
        completionItems.push(completionItem);
    }
}