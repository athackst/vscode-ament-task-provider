# ROS2 Ament Task Provider

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

![demo](demo.gif)

### Task panel

**Required setup** You must have the ament linters installed on your system for the appropriate linter to run.

```bash
sudo apt-get install ros-$ROS_DISTRO-ament-lint
```

From the task panel select ament and then the linter you'd like to run.

That's it!

### Task configuration

You can also save the configuration within your workspace like so:

```jsonc
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "ament",
      "task": "cppcheck", // The name of the problem matcher
      "path": "src/", // The path to your source files
      "commandOptions": "", // Optional additional command line options
      "problemMatcher": [
        "$ament_cppcheck" // the corresponding problem matcher - can be used independently
      ],
      "label": "ament: cppcheck"
    }
  ]
}
```

## License

This software is licensed under [Apache 2.0](https://github.com/athackst/htmlproofer-action/blob/main/LICENSE).

### Attributions

[Leaf icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/leaf)
