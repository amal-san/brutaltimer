#!/usr/bin/env node

const clear = require('clear')
const chalk = require('chalk')
const figlet = require('figlet')
const readline = require("readline-sync");
const { exec } = require('child_process');
var process = require('process');



clear()

console.log(
  chalk.bold.hex("#f5af19")(
    figlet.textSync('BRUTAL TIMER', {
      horizontalLayout: 'full'
    })
  )
)


const Timer = async (session) => {

    let seconds;
    var date = new Date();

    if(!session){
        console.log(chalk.bold.hex("#78ffd6")("Enter the time for each session (in minutes)"))
        seconds = Number(readline.question());
        if(Number(seconds)){
            seconds = seconds * 60 ;
        }
        else {
            stopSession("Enter number !!\n");
        }
    }
    else {
        seconds = session * 60;
    }

    let secondsForTimeout = seconds * 1000;

    console.log(chalk.bold.hex("#78ffd6")("Started 🏁....."))
    console.log(chalk.hex("#24FE41")(`Start Time: ${date.toString().slice(16,25)}`))

    return new Promise((resolve,reject) => {
            setTimeout(() => {
                exec('call windows.bat "brutaltimer" ""')

            },secondsForTimeout - 1000)
            setTimeout(() => {
                exec('Rundll32.exe user32.dll,LockWorkStation', (err, stdout, stderr) => {
                    if (err) {
                        console.error(err)
                    }
                    date = new Date();
                    console.log(chalk.hex("#24FE41")(`End Time: ${date.toString().slice(16,25)}`))
                    console.log(chalk.bold.hex("#f7ff00")(`Completed a session 👏`))
                    console.log(chalk.bold.hex("#78ffd6")("Restart a new session ? [Press y/Y to continue with same minutes] "))
                    resolve(seconds / 60) 
                });
                
            },secondsForTimeout)
        })
    }

const stopSession = (str) => {
    console.log(chalk.bold.hex("#f7ff00")(str ? str :  "Stopped Session"))
    process.exit(0);
}

const main = async (bool) => {
    exec("title brutaltimer")
    let sessionTime = await Timer(bool ? bool : false);
    let restart = readline.keyIn('',{hideEchoBack: true, mask: '',});
    if(restart === 'y'){
        main(sessionTime);
    }
    else {
        stopSession();
    } 
}

main();








