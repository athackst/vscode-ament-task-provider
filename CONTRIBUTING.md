# Contributing

I love your input! I want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Develop using VSCode

### What's in the folder

- `package.json` - this is the manifest file that defines the list of extensions of the extension pack.
- `src/extension.ts` - this is the entry point of the extension
- `src/amentTaskProvider.ts` - this is provides the ament tasks
- `tests/problem-matcher.test.ts` - this is the testing script

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

## Any contributions you make will be under the Apache Software License

In short, when you submit code changes, your submissions are understood to be under the same [Apache License](https://github.com/athackst/vscode-ament-task-provider/blob/main/LICENSE) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](https://github.com/athackst/vscode-ament-task-provider/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/athackst/vscode-ament-task-provider/issues/new/choose); it's that easy!

Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People _love_ thorough bug reports. I'm not even kidding.

## Use a Consistent Coding Style

I'm using [prettier](https://prettier.io/) to enforce styling. If you open this repository in VSCode using the dev container, everything should be set up for your already :smile:
