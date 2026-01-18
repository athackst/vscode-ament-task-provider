/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { AmentTaskProvider } from './amentTaskProvider';

type ProviderEntry = {
    provider: AmentTaskProvider;
    registration: vscode.Disposable;
};

const providers = new Map<string, ProviderEntry>();

let _channel: vscode.OutputChannel;
function getOutputChannel(): vscode.OutputChannel {
    if (!_channel) {
        _channel = vscode.window.createOutputChannel('Ament Task Provider');
    }
    return _channel;
}

function registerWorkspaceFolder(context: vscode.ExtensionContext, workspaceFolder: vscode.WorkspaceFolder): void {
    const key = workspaceFolder.uri.toString();
    if (providers.has(key)) {
        return;
    }

    const provider = new AmentTaskProvider(workspaceFolder);
    const registration = vscode.tasks.registerTaskProvider(AmentTaskProvider.AmentType, provider);
    context.subscriptions.push(provider, registration);
    providers.set(key, { provider, registration });
    getOutputChannel().appendLine(`Registered ament task provider for ${workspaceFolder.name}`);
}

function unregisterWorkspaceFolder(workspaceFolder: vscode.WorkspaceFolder): void {
    const key = workspaceFolder.uri.toString();
    const entry = providers.get(key);
    if (!entry) {
        return;
    }

    entry.registration.dispose();
    entry.provider.dispose();
    providers.delete(key);
    getOutputChannel().appendLine(`Unregistered ament task provider for ${workspaceFolder.name}`);
}

export function activate(context: vscode.ExtensionContext): void {
    const workspaceFolders = vscode.workspace.workspaceFolders ?? [];
    if (workspaceFolders.length === 0) {
        getOutputChannel().appendLine('Ament task provider requires a workspace root.');
        getOutputChannel().show(true);
        return;
    }

    getOutputChannel().appendLine(`Activating with ${workspaceFolders.length} workspace folder(s).`);
    workspaceFolders.forEach((workspaceFolder) => registerWorkspaceFolder(context, workspaceFolder));

    context.subscriptions.push(
        vscode.workspace.onDidChangeWorkspaceFolders((event) => {
            event.added.forEach((workspaceFolder) => registerWorkspaceFolder(context, workspaceFolder));
            event.removed.forEach((workspaceFolder) => unregisterWorkspaceFolder(workspaceFolder));
        })
    );
}

export function deactivate(): void {
    for (const entry of providers.values()) {
        entry.registration.dispose();
        entry.provider.dispose();
    }
    providers.clear();
}
