/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { getOutputChannel } from './outputChannel';

export class AmentTaskProvider implements vscode.TaskProvider {
    static AmentType = 'ament';
    private amentPromise: Thenable<vscode.Task[]> | undefined = undefined;
    private fileWatcher: vscode.FileSystemWatcher;
    private workspaceFolder: vscode.WorkspaceFolder;

    constructor(workspaceFolder: vscode.WorkspaceFolder) {
        this.workspaceFolder = workspaceFolder;
        const pattern = path.join(workspaceFolder.uri.fsPath, '**');
        this.fileWatcher = vscode.workspace.createFileSystemWatcher(pattern);
        this.fileWatcher.onDidChange(() => (this.amentPromise = undefined));
        this.fileWatcher.onDidCreate(() => (this.amentPromise = undefined));
        this.fileWatcher.onDidDelete(() => (this.amentPromise = undefined));
    }

    public provideTasks(): Thenable<vscode.Task[]> | undefined {
        if (!this.amentPromise) {
            this.amentPromise = getAmentTasks(this.workspaceFolder);
        }
        return this.amentPromise;
    }

    public resolveTask(_task: vscode.Task): vscode.Task | undefined {
        const task = _task.definition.task;
        // A Ament task consists of a task and an optional file as specified in AmentTaskDefinition
        // Make sure that this looks like a Rake task by checking that there is a task.
        if (task) {
            // resolveTask requires that the same definition object be used.
            const definition: AmentTaskDefinition = <any>_task.definition;
            let commandOptions = definition.commandOptions ?? '';
            let path = definition.path ?? 'src/';
            // Get the environment setting
            let configEnvSetup = vscode.workspace.getConfiguration('ament-task-provider').get('envSetup', '');
            // Override with task setting
            let taskEnvSetup = definition.envSetup ?? configEnvSetup;
            // Resolve command
            let rosSetupScript = taskEnvSetup ? `${taskEnvSetup} &&` : '';
            let commandLine = `${rosSetupScript} ament_${definition.task} ${commandOptions} ${path}`;
            return new vscode.Task(
                /*task definition*/ definition,
                /*task scope*/ _task.scope ?? this.workspaceFolder,
                /*name*/ definition.task,
                /*source*/ 'ament',
                /*execution*/ new vscode.ShellExecution(commandLine)
            );
        }
        return undefined;
    }

    public dispose(): void {
        this.fileWatcher.dispose();
    }
}

interface AmentTaskDefinition extends vscode.TaskDefinition {
    /**
     * The task name
     */
    task: string;

    /**
     * The path to lint
     */
    path?: string;

    /**
     * Command line options
     */
    commandOptions?: string;

    /**
     * environment set up script
     */
    envSetup?: string;
}

async function getAmentTasks(workspaceFolder: vscode.WorkspaceFolder): Promise<vscode.Task[]> {
    // create a task for each linter
    const lintersWithMatchers: string[] = ['cpplint', 'cppcheck', 'lint_cmake', 'flake8', 'mypy', 'pep257', 'xmllint'];
    const discoveredLinters = discoverAmentTools();
    const discoveredSet = new Set(discoveredLinters);
    const linters = discoveredLinters;
    const channel = getOutputChannel();

    discoveredLinters
        .filter((linter) => !lintersWithMatchers.includes(linter))
        .forEach((linter) =>
            channel.appendLine(
                `Ament tool configured for tasks for ${workspaceFolder.name} without a problem matcher: ament_${linter}`
            )
        );
    discoveredLinters
        .filter((linter) => lintersWithMatchers.includes(linter))
        .forEach((linter) =>
            channel.appendLine(
                `Ament tool configured for tasks for ${workspaceFolder.name} with problem matcher: ament_${linter}`
            )
        );
    channel.appendLine(
        `Ament task discovery for ${workspaceFolder.name}: ` + `using ${linters.length} tool(s) found on PATH`
    );
    const configEnvSetup = vscode.workspace.getConfiguration('ament-task-provider').get('envSetup', '');
    const result: vscode.Task[] = [];
    linters.forEach((linter) => {
        const kind: AmentTaskDefinition = {
            type: 'ament',
            task: `${linter}`,
            path: 'src/',
            commandOptions: '',
            envSetup: `${configEnvSetup}`,
        };
        let rosSetupScript = kind.envSetup ? `${kind.envSetup} &&` : '';
        const commandLine = `${rosSetupScript} ament_${linter} ${kind.commandOptions} ${kind.path}`;
        const task = new vscode.Task(
            /*task definition*/ kind,
            /*task scope*/ workspaceFolder,
            /*name*/ `${linter}`,
            /*source*/ 'ament',
            /*execution*/ new vscode.ShellExecution(`${commandLine}`),
            /*problem matcher*/ lintersWithMatchers.includes(linter) ? `$ament_${linter}` : undefined
        );
        result.push(task);
    });
    return result;
}

function discoverAmentTools(): string[] {
    const prefix = 'ament_';
    const pathEnv = process.env.PATH ?? '';
    const entries = new Set<string>();
    for (const dir of pathEnv.split(path.delimiter)) {
        if (!dir) {
            continue;
        }
        let dirEntries: string[];
        try {
            dirEntries = fs.readdirSync(dir);
        } catch {
            continue;
        }
        for (const entry of dirEntries) {
            if (!entry.startsWith(prefix)) {
                continue;
            }
            const fullPath = path.join(dir, entry);
            try {
                const stat = fs.statSync(fullPath);
                if (!stat.isFile()) {
                    continue;
                }
            } catch {
                continue;
            }
            entries.add(entry.slice(prefix.length));
        }
    }
    return Array.from(entries).sort();
}
