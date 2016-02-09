'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
let path = require('path');
let shelljs = require('shelljs');
let _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stupendous ' + chalk.red('generator-transcendence') + ' generator!'
    ));
    
    this.gitInfo = {
      name: shelljs.exec('git config user.name', {silent: true}).output.replace(/\n/g, ''),
      email: shelljs.exec('git config user.email', {silent: true}).output.replace(/\n/g, ''),
      github: shelljs.exec('git config github.user', {silent: true}).output.replace(/\n/g, ''),
    };
    
    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'Please choose your application name',
        default: shelljs.exec('basename "$PWD"').output.replace(/\n/g, '')
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please describe the application you\'re building.',
        default: "An application using WebPack, ReactJS and ES6."
      },
      {
        type: 'input',
        name: 'github',
        message: 'Please enter your GitHub URL.',
      },
      {
        type: 'input',
        name: 'name',
        message: 'What\'s your name?',
        default: this.gitInfo.name
      },
      
      {
        type: 'input',
        name: 'email',
        message: 'What\'s your email?',
        default: this.gitInfo.email
      },
    ];
    
    
    
    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      
      done();
    }.bind(this));
  },
  
  writing: function () {
    
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );
    
    this.fs.copy(
      this.templatePath('index.html'),
      this.destinationPath('index.html')
    );
    this.fs.copy(
      this.templatePath('server.js'),
      this.destinationPath('server.js')
    );
    this.fs.copy(
      this.templatePath('webpack-production.config.js'),
      this.destinationPath('webpack-production.config.js')
    );
    
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
    
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath('src')
    );
    
    this.fs.copy(
      this.templatePath('public'),
      this.destinationPath('public')
    );
    
    this.fs.copy(
      this.templatePath('build'),
      this.destinationPath('build')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    // Generate our package.json. Make sure to also include the required dependencies for styles
    let defaultSettings = this.fs.readJSON(this.templatePath('package.json'));
    let packageSettings = {
      name: this.props.appName,
      private: true,
      version: '0.0.1',
      description: this.props.description,
      main: '',
      scripts: defaultSettings.scripts,
      repository: this.props.github,
      keywords: [],
      author: this.props.name,
      email: this.props.email,
      devDependencies: defaultSettings.devDependencies,
      dependencies: defaultSettings.dependencies
    };
    
    
    this.fs.writeJSON(this.destinationPath('package.json'), packageSettings);
    
    
  },
  
  install: function () {
    shelljs.exec('npm install', {silent: false});
    shelljs.exec('npm install', {silent: false});
  }
});
