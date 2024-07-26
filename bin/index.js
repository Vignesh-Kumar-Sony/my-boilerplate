#!/usr/bin/env node

// const { execSync } = require('child_process');
// const path = require('path');
// const fs = require('fs');

// if (process.argv.length < 3) {
//   console.log('You have to provide a name to your app.');
//   console.log('For example :');
//   console.log('    npx create-my-boilerplate my-app');
//   process.exit(1);
// }

// const projectName = process.argv[2];
// const currentPath = process.cwd();
// // const projectPath = path.join(currentPath, projectName);
// const projectPath = projectName
// // const localFolderPath = path.join(currentPath, 'C---Sample-Project'); // Path to your local folder
// // const git_repo = "https://github.com/Vignesh-Kumar-Sony/Application-Starter.git";
// const git_repo = "https://github.com/Vignesh-Kumar-Sony/C---Sample-Project.git";
// // const git_repo = "C---Sample-Project"


// try {
//   // fs.mkdirSync(projectPath)
// } catch (err) {
//   if (err.code === 'EEXIST') {
//     console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
//   } else {
//     console.log(error);
//   }
//   process.exit(1);
// }

// async function main() {
//   try {
//     console.log('Downloading files...');
//     // var exeCommand = `git clone --depth 1 ${git_repo} ${projectPath}`
//     var exeCommand = `git clone ${git_repo} ${projectPath}`
//     // var exeCommand = `zip -r my-folder.zip /path/to/your/project/folder-to-clone`
//     console.log(currentPath, projectName)
//     console.log(exeCommand)
//     execSync(exeCommand);

//     console.log("pROJECTpATH"+projectPath)
//     process.chdir(projectPath);

//     // Executable code
//     // console.log('Initializing npm...');
//     // execSync('npm init -y', { stdio: 'inherit' });
    
//     // console.log('Installing dependencies...');
//     // execSync('npm install');
//     // console.log('packages installed');

//     // console.log('Removing useless files');
//     // execSync('npx rimraf ./.git');
//     // console.log('rimraf installed');

//     //Executable code for C Program

//     console.log('Initializing build...');
//     execSync('cmake -Bbuild', { stdio: 'inherit' });
    
//     console.log('Installing dependencies...');
//     execSync('cmake --build build');

//     console.log('The installation is done, this is ready to use !');
//     console.log('To Run executable file use "./build/TimeStub" CLI command');
  

//     // console.log(path.join(projectPath, 'bin'))
    
//     // fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true});

//     console.log('The installation is done, this is ready to use !');

    
//     console.log('Zipping the project directory...');
//     execSync(`zip -r ${projectName}.zip .`, { cwd: currentPath });
//     console.log(`Created zip file: ${path.join(currentPath, `${projectName}.zip`)}`);


//   } catch (error) {
//     console.log(error);
//   }
// }
// main();



const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra'); // Use fs-extra for easy directory copying

if (process.argv.length < 3) {
  console.log('You have to provide a name for your app.');
  console.log('For example:');
  console.log('    npx create-my-boilerplate my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, 'templateOutput', projectName);
const localFolderPath = path.join(currentPath, 'bin', 'C---Sample-Project'); // Path to your local folder
let zipFilePath;

// try {
//   fs.mkdirSync(projectName)
//   // Check if the project directory already exists
//   if (fs.existsSync(projectPath)) {
//     console.log(`The project ${projectName} already exists in the current directory, please give it another name.`);
//     process.exit(1);
//   }

//   // Copy the local folder to the new project directory
//   fs.copySync(localFolderPath, projectPath);
//   console.log(`Copied ${localFolderPath} to ${projectPath}`);
// } catch (err) {
//   console.log(`Error while copying folder: ${err}`);
//   process.exit(1);
// }

try {
  fs.mkdirSync(projectPath)
// Copy the local folder to the new project directory
  fs.copySync(localFolderPath, projectPath);
  console.log(`Copied ${localFolderPath} to ${projectPath}`);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
  } else {
    console.log(err);
  }
  process.exit(1);
}

async function main() {
  try {
    process.chdir(projectPath);

    console.log('Initializing build...');
    execSync('cmake -Bbuild', { stdio: 'inherit' });

    console.log('Installing dependencies...');
    execSync('cmake --build build', { stdio: 'inherit' });

    console.log('The installation is done, this is ready to use!');
    console.log('To Run executable file use "./build/TimeStub" CLI command');

    console.log('Zipping the project directory...');
    console.log("projectName"+projectName+"   currentPath"+projectName);
    execSync(`zip -r ${projectName}.zip .`, { cwd: projectPath });
    // execSync(`zip -r ${projectName}.zip  ../templateOutputZip`);
    console.log(`Created zip file: ${path.join(currentPath, `${projectName}.zip`)}`);
    zipFilePath = path.join(currentPath, `templateOutput/${projectName}/${projectName}.zip`)
    console.log(zipFilePath);
    window.location.href = zipFilePath;
  } catch (error) {
    console.log(error);
  }
}

main();
