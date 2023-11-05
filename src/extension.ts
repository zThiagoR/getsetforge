import * as vscode from 'vscode';

import { generateAccessors } from './accessorsGenerator';
import { getClassPropertiesJS, getClassPropertiesTS } from './propertiesParser';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('getsetforge.generateGettersSetters', () => {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		vscode.window.showInformationMessage('Open a class file to generate getters and setters.');
		return;
	}

	const text = editor.document.getText();
	const typeLanguage = editor.document.languageId;
	let properties;

	switch (typeLanguage) {
		case 'typescript':
			properties = getClassPropertiesTS(text);
			break;
		case 'javascript':
			properties = getClassPropertiesJS(text);
			break;
		default:
			vscode.window.showInformationMessage('Language not supported for getters and setters generation.');
			return;
	}

	const tabSize = editor.options.tabSize as number;
	const useTabs = editor.options.insertSpaces === false;

	const accessorsCode = generateAccessors(properties, typeLanguage === 'typescript', tabSize, useTabs);
	const classDeclarationEnd = text.lastIndexOf('}');
	const insertPosition = editor.document.positionAt(classDeclarationEnd - 1);

	editor.edit(editBuilder => {
			editBuilder.insert(insertPosition, `\n\n${accessorsCode}`);
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
