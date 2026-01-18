import * as vscode from 'vscode';

let channel: vscode.OutputChannel;

export function getOutputChannel(): vscode.OutputChannel {
    if (!channel) {
        channel = vscode.window.createOutputChannel('Ament Task Provider');
    }
    return channel;
}
