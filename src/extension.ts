/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { AmentTaskProvider } from './amentTaskProvider';

let amentTaskProvider: vscode.Disposable | undefined;

export function activate(_context: vscode.ExtensionContext): void {
	const workspaceRoot = vscode.workspace.rootPath;
	if (!workspaceRoot) {
		return;
	}

	amentTaskProvider = vscode.tasks.registerTaskProvider(
		AmentTaskProvider.AmentType,
		new AmentTaskProvider(workspaceRoot)
	);
}

export function deactivate(): void {
	if (amentTaskProvider) {
		amentTaskProvider.dispose();
	}
}
