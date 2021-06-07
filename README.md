# ROS2 Problem Matchers for VS Code

Provides [problem matchers](https://code.visualstudio.com/docs/editor/tasks#_processing-task-output-with-problem-matchers) for use with ROS2 projects using the [ament build system](https://docs.ros.org/en/foxy/Concepts/About-Build-System.html?highlight=ament#id3).

## Features

Provides the following problem matchers:

- **\$ament-cpplint** &mdash; adds errors and warnings reported by [ament_cpplint](https://github.com/ament/ament_lint/blob/master/ament_cpplint/doc/index.rst)
- **\$ament-cppcheck** &mdash; adds errors and warnings reported by [ament_cppcheck]()
- **\$ament-lint-cmake** &mdash; adds errors and warnings reported by [ament_lint_cmake]()
- **\$ament-flake8** &mdash; adds errors and warnings reported by [ament_flake8]()
- **\$ament-pep257** &mdash; adds errors and warnings reported by [ament_pep257]()
- **\$ament-xmllint** &mdash; adds errors and warnings reported by [ament_xmllint]()

## Usage

The following example shows how to add problem matchers to your project:

```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"label": "cpplint",
			"detail": "Lint files with cpplint.",
			"type": "shell",
			"command": "ament_cpplint src/",
			"problemMatcher": ["$ament-cpplint"]
		}
	]
}
```

# Developers

## What's in the folder

- This folder contains all of the files necessary for your extension pack.
- `package.json` - this is the manifest file that defines the list of extensions of the extension pack.

## Get up and running straight away

- Press `F5` to open a new window with your extension loaded.
- Open `Extensions Viewlet` and check your extensions are installed.

## Make changes

- You can relaunch the extension from the debug toolbar after making changes to the files listed above.
- You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.

## Install your extension

- To start using your extension with Visual Studio Code copy it into the `<user home>/.vscode/extensions` folder and restart Code.
- To share your extension with the world, read on https://code.visualstudio.com/docs about publishing an extension.
