#!/bin/bash
if npm version ${VERSION} --no-git-tag-version; then
  echo "Version bumped to ${VERSION}"
else
  echo "Failed to bump version to ${VERSION}"
  exit 1
fi
