#!/bin/bash
git branch -D dist
git push origin --delete dist
git checkout -b dist
yarn build:lib
rm -rf src e2e projects
rm -rf package.json angular-playground.json angular.json tsconfig.json tslint.json yarn.lock .angulardoc.json .editorconfig
mv dist/instant/* .
rm -rf dist
git add .
git commit -m "Publishing to github pages"
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]') && git tag -a $PACKAGE_VERSION -m "Version $PACKAGE_VERSION"
git push origin dist --tags
git checkout master


