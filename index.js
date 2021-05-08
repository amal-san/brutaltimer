#!/usr/bin/env node

const clear = require('clear')
const chalk = require('chalk')
const figlet = require('figlet')
const readline = require("readline-sync");
const { exec } = require('child_process');


clear()

console.log(
  chalk.green.bold(
    figlet.textSync('BRUTAL TIMER', {
      horizontalLayout: 'full'
    })
  )
)


const Timer = async (session) => {
    let seconds;

    if(!session){
        console.log(chalk.green.bold("Enter the time for each session (in minutes)"))
        seconds = Number(readline.question());
        seconds = seconds * 60;
    }
    else {
        seconds = session * 60;
    }
    
    

    let secondsForTimeout = seconds * 1000;

    console.log(chalk.yellow.bold("Started 🏁"))
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                exec('Rundll32.exe user32.dll,LockWorkStation', (err, stdout, stderr) => {
                    if (err) {
                        console.error(err)
                    } 
                });
                console.log(chalk.yellow.bold(`Completed a session 👏`))
                console.log(chalk.yellow.bold("Restart a new session ? [Press y/Y to continue with same minutes] "))
                resolve(seconds)
            },secondsForTimeout)
        })
    }

const main = async (bool) => {
    let sessionTime = await Timer(bool ? bool : false);
    let restart = readline.keyIn('',{hideEchoBack: true, mask: '',});
    if(restart === 'y'){
        main(sessionTime);
    }
    else {
        console.log(chalk.red.bold("Stopped Session"))
        return;
    } 
}

main();








