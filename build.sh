#!/bin/bash
buildDir="./build"
mainJSTargetPath="$buildDir/main.js"

#Colors
PURPLE='\033[0;35m'
NC='\033[0m'


while getopts p:a: option
  do
    case "${option}"
      in
        p) PLATFORM=${OPTARG};;
        a) ARCH=${OPTARG};;
      esac
done

printf "${PURPLE}# Starting webpack builder...${NC} \n"

export NODE_ENV='production' && webpack

if [ -e "$buildDir" ]; then
  while true; do
    read -p "Directory $buildDir already exist, clear it? " yn
    case $yn in
        [Yy]* ) rm -rf $buildDir; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
  done
fi
printf "${PURPLE}# Creating $buildDir directory${NC} \n"
mkdir $buildDir
printf "${PURPLE}# Copying basic source files${NC} \n"
cp -r ./final $buildDir
cp main.js $buildDir
cp $buildDir/final/package.json $buildDir
rm -rf $buildDir/final/package.json
printf "${PURPLE}# Installing dependencies${NC} \n"
cd $buildDir
npm install
cd ..
printf "${PURPLE}# main.js switching to production mode${NC} \n"
sed -i 's/const prodEnv = false/const prodEnv = true/g' $mainJSTargetPath
sed -i 's/const build = false/const build = true/g' $mainJSTargetPath
printf "${PURPLE}# Copied all source files${NC} \n"
printf "${PURPLE}# Starting electron-packager...${NC} \n"
./node_modules/.bin/electron-builder build --projectDir=$buildDir
printf "${PURPLE}# Clearing temp directory ${buildDir} ${NC} \n"
rm -rf $buildDir;
printf "${PURPLE}# Done${NC} \n"
