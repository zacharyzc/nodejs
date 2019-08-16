#!/usr/local/bin/node
//解释器，用node环境执行
const cm = require('commander');
const inquirer = require('inquirer');
const down = require('./bin/downproject.js')
cm.version('1.0.0','-v --version');
cm.command('init <name>').action((name) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'projectname',
      message: '项目叫什么名字'
    }
  ]).then((ans) => {
    down(ans.projectname)
  })
})
cm.parse(process.argv);