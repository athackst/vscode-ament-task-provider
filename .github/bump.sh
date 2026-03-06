#!/bin/bash
set -euo pipefail

if [[ -z "${VERSION:-}" ]]; then
  echo "VERSION is not set"
  exit 1
fi

current_version="$(node -p "require('./package.json').version")"
target_version="${VERSION#v}"

if [[ "${current_version}" == "${target_version}" ]]; then
  echo "Version already ${target_version}; no bump needed"
  exit 0
fi

if npm version "${VERSION}" --no-git-tag-version; then
  echo "Version bumped to ${VERSION}"
else
  echo "Failed to bump version to ${VERSION}"
  exit 1
fi
