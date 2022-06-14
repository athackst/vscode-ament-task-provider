# ROS2 Problem Matchers for VS Code

Provides [problem matchers](https://code.visualstudio.com/docs/editor/tasks#_processing-task-output-with-problem-matchers) for use with ROS2 projects using the [ament build system](https://docs.ros.org/en/foxy/Concepts/About-Build-System.html?highlight=ament#id3).

## Features

Provides the following problem matchers:

- **\$ament-cpplint** &mdash; adds errors and warnings reported by [ament_cpplint](https://github.com/ament/ament_lint/blob/master/ament_cpplint/doc/index.rst)
- **\$ament-cppcheck** &mdash; adds errors and warnings reported by [ament_cppcheck](https://github.com/ament/ament_lint/blob/master/ament_cmake_cppcheck/doc/index.rst)
- **\$ament-lint-cmake** &mdash; adds errors and warnings reported by [ament_lint_cmake](https://github.com/ament/ament_lint/blob/master/ament_cmake_lint_cmake/doc/index.rst)
- **\$ament-flake8** &mdash; adds errors and warnings reported by [ament_flake8](https://github.com/ament/ament_lint/blob/master/ament_flake8/doc/index.rst)
- **\$ament-pep257** &mdash; adds errors and warnings reported by [ament_pep257](https://github.com/ament/ament_lint/blob/master/ament_cmake_pep257/doc/index.rst)
- **\$ament-xmllint** &mdash; adds errors and warnings reported by [ament_xmllint](https://github.com/ament/ament_lint/blob/master/ament_xmllint/doc/index.rst)

## Usage

The following example shows how to add problem matchers to your project:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "ament",
            "task": "cppcheck", // the name of the problem matcher
            "path": "src/", // The path to your source files
            "problemMatcher": [
                "$ament_cppcheck" // the corresponding problem matcher - can be used independently
            ],
            "label": "ament: cppcheck"
        }
    ]
}
```

## Developers

### What's in the folder

- This folder contains all of the files necessary for your extension pack.
- `package.json` - this is the manifest file that defines the list of extensions of the extension pack.

### Get up and running straight away

- Press `F5` to open a new window with your extension loaded.
- Open `Extensions Viewlet` and check your extensions are installed.

### Make changes

- You can relaunch the extension from the debug toolbar after making changes to the files listed above.
- You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.

### Install your extension

- To create your extension package run `vsce package`
- To start using your extension with Visual Studio Code copy it into the `<user home>/.vscode/extensions` folder and restart Code.
- To share your extension with the world, read on <https://code.visualstudio.com/docs> about publishing an extension.
