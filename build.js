const chalk = require('chalk');
const { spawn } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

start();

async function start() {
  // 1. clear
  await runClear();
  // 2. 启动服务/构建
  await runServer();
}


// async function runClear() {
//   console.log(chalk.blue(`执行clear命令  start`));
//   await (function () {
//     return new Promise(function (resolve) {
//     console.log(chalk.blue(`执行clear命令  ing`));
//     rimraf('./lib', function () {
//         resolve();
//       })
//     });
//   })();
//   console.log(chalk.blue(`执行clear命令  end`));
//   successLog();
// }

async function runClear() {
  console.log(chalk.blue(`执行clear命令  start`));
  await doCommand('./node_modules/.bin/rimraf lib');
  console.log(chalk.blue(`执行clear命令  end`));
  successLog();
}
async function runServer() {
  await doCommand(`./node_modules/.bin/babel src --copy-files --source-maps --extensions .es6,.es,.jsx,js --out-dir lib`);
}
/**
 *
 * @param sign //0 本地 1 测试  2 发布http 3  发布https
 * @param message //控制台打印信息
 * @returns {Promise}
 */
function doCommand(commanddStr) {
  const promiseInstance = new Promise(function (resolve) {
    const ls = spawn(commanddStr, [],
      {
        shell: true
      }
    );
    ls.stdout.on('data', (data) => {
      console.log(chalk.green(`${data}`));
    });
    ls.stderr.on('data', (data) => {
      console.log(`错误：${data}`);
    });
    ls.on('close', (code) => {
      resolve();
    });
  })
  return promiseInstance;
}
// twBase打包程序  end

function successLog() {
  console.log(chalk.yellow('\n---------------------------------------'))
  console.log(chalk.yellow('---------------------------------------'))
  console.log(chalk.yellow('-------------  服务配置完成  ---------- '))
  console.log(chalk.yellow('---------------------------------------'))
  console.log(chalk.yellow('---------------------------------------\n'))
  console.log(chalk.blue(`即将执行命令：./node_modules/.bin/babel src --copy-files --source-maps --extensions .es6,.es,.jsx,js --out-dir lib\n`))
}