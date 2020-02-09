#!/bin/bash

echo "Setting up git hooks for local development and "

HOOK_NAMES="pre-commit"

echo
PROJECT_DIR="$(git rev-parse --show-toplevel)"
HOOKS_DIR="$PROJECT_DIR"/.git/hooks
git checkout -B v1.x
echo

function program_doesnt_exist {
  local return_=1
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return $return_ instead of printing
  return $return_
}

# check for yarn installation
if program_doesnt_exist yarn; then
  curl -o- -L https://yarnpkg.com/install.sh | bash
fi

if program_doesnt_exist yarn; then
  echo "\t\033[41mPlease install yarn globally (sudo npm i yarn -g)\033[0m"
  exit 1
fi

echo
echo "## Doing a yarn install in client"
cd client
yarn install
cd ../server

echo
echo "## Doing a yarn install in server"
yarn install

cd ..
echo "## Doing a yarn install in root folder"
yarn install
# assuming the script is in git-essentials directory, one level into the repo
for hook in $HOOK_NAMES; do
    # If the hook already exists, is executable, and is not a symlink
    if [ ! -h $HOOKS_DIR/$hook -a -x $HOOKS_DIR/$hook ]; then
            mv $HOOKS_DIR/$hook $HOOKS_DIR/$hook.local
                fi
                    # create the symlink, overwriting the file if it exists
                    # probably the only way this would happen is if you're using an old version of git
                    # -- back when the sample hooks were not executable, instead of being named ____.sample
                    ln -s -f $PROJECT_DIR/git-essentials/hooks/$hook $HOOKS_DIR/$hook
                    done

chmod +x $PROJECT_DIR/.git/hooks/*
echo
echo "#######---->> All Setup, Don't mess up the code & follow linting rules. <<----#######"

