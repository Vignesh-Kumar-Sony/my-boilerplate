#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('    npx create-my-boilerplate my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
// const projectPath = path.join(currentPath, projectName);
const projectPath = projectName
const git_repo = "https://github.com/Vignesh-Kumar-Sony/Application-Starter.git";
// const git_repo = "https://github.com/vinay-shivashankar-sony/EOLSupport.git";



try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
  } else {
    console.log(error);
  }
  process.exit(1);
}

async function main() {
  try {
    console.log('Downloading files...');
    var exeCommand = `git clone --depth 1 ${git_repo} ${projectPath}`
    console.log(currentPath, projectName)
    console.log(exeCommand)
    execSync(exeCommand);

    process.chdir(projectPath);

    console.log('Initializing npm...');
    execSync('npm init -y', { stdio: 'inherit' });
    
    console.log('Installing dependencies...');
    execSync('npm install');
    console.log('packages installed');

    console.log('Removing useless files');
    execSync('npx rimraf ./.git');
    console.log('rimraf installed');

    console.log(path.join(projectPath, 'bin'))
    
    // fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true});

    console.log('The installation is done, this is ready to use !');

  } catch (error) {
    console.log(error);
  }
}
main();