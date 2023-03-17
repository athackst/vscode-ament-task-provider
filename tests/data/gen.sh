#!/bin/bash

DOCKER_CMD="docker run --rm -v $PWD/tests/data:/workspace --user $(id -u):$(id -g) althack/ros2:humble-dev bash -c"

fixture_gen () {
    local program=$1
    local file=$2
    local output=$3
    echo `$DOCKER_CMD "cd /workspace && $program $file &> $output"`
}

# purge old data
rm tests/data/*.txt

echo "generating cpplint"
fixture_gen ament_cpplint cpplint_ok.cpp cpplint_ok.txt
fixture_gen ament_cpplint cpplint_fail.cpp cpplint_fail.txt

echo "generating cppcheck"
fixture_gen ament_cppcheck cppcheck_ok.cpp cppcheck_ok.txt
fixture_gen ament_cppcheck cppcheck_fail.cpp cppcheck_fail.txt

echo "generating lint_cmake"
fixture_gen ament_lint_cmake cmakelint_ok.cmake cmakelint_ok.txt
fixture_gen ament_lint_cmake cmakelint_fail.cmake cmakelint_fail.txt

echo "genereating flake8"
fixture_gen ament_flake8 flake8_ok.py flake8_ok.txt
fixture_gen ament_flake8 flake8_fail.py flake8_fail.txt

echo "generating pep257"
fixture_gen ament_pep257 pep257_ok.py pep257_ok.txt
fixture_gen ament_pep257 pep257_fail.py pep257_fail.txt

echo "generating xmllint"
fixture_gen ament_xmllint xmllint_ok.xml xmllint_ok.txt
fixture_gen ament_xmllint xmllint_fail.xml xmllint_fail.txt
