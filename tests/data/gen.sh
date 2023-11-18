#!/bin/bash

OUTPUT_DIR="output"
DATA_DIR="$PWD/tests/data"
DOCKER_IMAGE=${DOCKER_IMAGE:-"althack/ros2:humble-dev"}
DOCKER_CMD="docker run --rm -v $DATA_DIR:/workspace --user $(id -u):$(id -g) ${DOCKER_IMAGE} bash -c"

docker pull $DOCKER_IMAGE

fixture_gen () {
    local program=$1
    local file=$2
    local output="$OUTPUT_DIR/$2.out"
    echo `$DOCKER_CMD "cd /workspace && $program $file &> $output"`
}

echo "purge old data"
rm -v -fr $DATA_DIR/$OUTPUT_DIR
mkdir -p $DATA_DIR/$OUTPUT_DIR

echo "generating cpplint"
fixture_gen ament_cpplint cpplint_ok.cpp
fixture_gen ament_cpplint cpplint_fail.cpp

echo "generating cppcheck"
fixture_gen ament_cppcheck cppcheck_ok.cpp
fixture_gen ament_cppcheck cppcheck_fail.cpp

echo "generating lint_cmake"
fixture_gen ament_lint_cmake cmakelint_ok.cmake
fixture_gen ament_lint_cmake cmakelint_fail.cmake

echo "generating flake8"
fixture_gen ament_flake8 flake8_ok.py
fixture_gen ament_flake8 flake8_fail.py

echo "generating mypy"
fixture_gen ament_mypy mypy_ok.py
fixture_gen ament_mypy mypy_fail.py

echo "generating pep257"
fixture_gen ament_pep257 pep257_ok.py
fixture_gen ament_pep257 pep257_fail.py

echo "generating xmllint"
fixture_gen ament_xmllint xmllint_ok.xml
fixture_gen ament_xmllint xmllint_fail.xml
