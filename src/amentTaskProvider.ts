/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as path from 'path';
import * as vscode from 'vscode';

export class AmentTaskProvider implements vscode.TaskProvider {
    static AmentType = 'ament';
    private amentPromise: Thenable<vscode.Task[]> | undefined = undefined;

    constructor(workspaceRoot: string) {
        const pattern = path.join(workspaceRoot, '**');
        const fileWatcher = vscode.workspace.createFileSystemWatcher(pattern);
        fileWatcher.onDidChange(() => (this.amentPromise = undefined));
        fileWatcher.onDidCreate(() => (this.amentPromise = undefined));
        fileWatcher.onDidDelete(() => (this.amentPromise = undefined));
    }

    public provideTasks(): Thenable<vscode.Task[]> | undefined {
        if (!this.amentPromise) {
            this.amentPromise = getAmentTasks();
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
                /*task scope*/ _task.scope ?? vscode.TaskScope.Workspace,
                /*name*/ definition.task,
                /*source*/ 'ament',
                /*execution*/ new vscode.ShellExecution(commandLine)
            );
        }
        return undefined;
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

async function getAmentTasks(): Promise<vscode.Task[]> {
    // create a task for each linter
    const linters: string[] = ['cpplint', 'cppcheck', 'lint_cmake', 'flake8', 'mypy', 'pep257', 'xmllint'];
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
            /*task scope*/ vscode.TaskScope.Workspace,
            /*name*/ `${linter}`,
            /*source*/ 'ament',
            /*execution*/ new vscode.ShellExecution(`${commandLine}`),
            /*problem matcher*/ `$ament_${linter}`
        );
        result.push(task);
    });
    return result;
}
