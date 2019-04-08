#!/bin/bash
echo "# Starting webpack builder ..."
export NODE_ENV='production' && webpack
buildDir="./build"
if [ -e "$buildDir" ]; then
  while true; do
    read -p "Directory $buildDir already exist, clear it? " yn
    case $yn in
        [Yy]* ) rm -rfv $buildDir; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
  done
fi
echo "# Creating $buildDir directory"
mkdir $buildDir
echo "# Copying basic source files"
cp -r ./final $buildDir
cp main.js $buildDir
cp renderer.js $buildDir
echo "{
  \"name\": \"dayroutine\",
  \"version\": \"1.0.1\",
  \"productName\": \"Day Routine\",
  \"main\": \"main.js\",
  \"license\": \"MIT\",
  \"dependencies\": {
    \"node-notifier\": \"^5.2.1\"
  },
  \"build\": {
    \"appId\": \"Day Routine\",
    \"mac\": {
      \"category\": \"organizer\"
    }
  }
}" > $buildDir/package.json
echo "# Installing dependencies"
cd $buildDir
npm install
cd ..
echo "# main.js switching to production mode"
sed -i 's/var prodEnv = false/var prodEnv = true/g' $buildDir/main.js
echo "# Copying resources"
mkdir $buildDir/res
cp -r ./res/* $buildDir/res
echo "# Copied all source files"
echo "# Starting electron-packager ..."
electron-packager $buildDir Day-Routine —icon='./res/images/routinelogo@medium.png'
