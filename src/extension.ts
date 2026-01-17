/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { AmentTaskProvider } from './amentTaskProvider';

let amentTaskProviderRegistration: vscode.Disposable | undefined;
let amentTaskProvider: AmentTaskProvider | undefined;

let _channel: vscode.OutputChannel;
function getOutputChannel(): vscode.OutputChannel {
    if (!_channel) {
        _channel = vscode.window.createOutputChannel('Ament Task Provider');
    }
    return _channel;
}

export function activate(_context: vscode.ExtensionContext): void {
    const workspaceRoot =
        vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
            ? vscode.workspace.workspaceFolders[0].uri.fsPath
            : undefined;
    if (!workspaceRoot) {
        getOutputChannel().appendLine('Ament task provider requires a workspace root.');
        getOutputChannel().show(true);
        return;
    }

    amentTaskProvider = new AmentTaskProvider(workspaceRoot);
    amentTaskProviderRegistration = vscode.tasks.registerTaskProvider(AmentTaskProvider.AmentType, amentTaskProvider);
}

export function deactivate(): void {
    if (amentTaskProviderRegistration) {
        amentTaskProviderRegistration.dispose();
    }
    if (amentTaskProvider) {
        amentTaskProvider.dispose();
    }
}
