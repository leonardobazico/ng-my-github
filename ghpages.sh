#!/bin/bash

git branch -D gh-pages
git push origin :gh-pages
git checkout -b gh-pages

PKG_VERSION=$(node -p -e "require('./package.json').version")

npm run dist:ghpages
rm *.*

for d in */ ; do
  d=${d/\//}
  if [[ ($d != *".git"*) && ($d != *"www"*) && ($d != *"node_modules"*) && ($d != *"bower_components"*) ]]
  then
    echo "$d"
    rm -rfd $d
  fi
done

mv www/* .

git add -A
git commit -m  "v$PKG_VERSION"
git push origin gh-pages
