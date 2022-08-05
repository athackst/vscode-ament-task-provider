#!/bin/bash
grep "version" package.json | sed -r 's/.*"version": "(.*)",/\1/'
