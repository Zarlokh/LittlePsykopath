var commands = require('../config/commands');
var utils = require('../utils/functions');
var Error = require('./errors');

var Command = function(name, args, options, permission, method) {
  this.name = name || null;
  this.args = args || null;
  this.options = options || null;
  this.permission = permission || null;
  this.method = method || null;

  this.process = () => {
      eval(this.method + "()");
  };

  var ping = () => {
    console.log("PsykoPong");
  };
};

exports.getCommand = (commandLine) => {
  var commandList = commands.commandList;
  var commandChoice = {};
  for(var index in commandList){
    if(commandLine.indexOf(commandList[index].name) !== -1){
      var commandSelected = commandList[index];
      commandChoice = new Command(
        commandSelected.name || null,
        commandSelected.args || null,
        commandSelected.options || null,
        commandSelected.permission || null,
        commandSelected.method || null
        );
      break;
    }
  }
  return commandChoice;
};

exports.extractCommand = (commandLine) => {
  commandLine = commandLine.replace(/\s\s+/g, ' ');
  var split = commandLine.split(' ');
  var result = new Command();
  var hadOptions = false;
  result.name = split[0];
  split = split.slice(1);

  for(var index in split){
    var element = split[index];
    if(hadOptions){
      if(element.indexOf('+') === -1){
        var lastOptions = result.options[result.options.length - 1];
        if(lastOptions.value !== null){
          result = result.name.replace('zp@', '');
          break;
        }
        result.options[result.options.length - 1].value = element;
      }else{
        result.options.push({name: element, value: null});
      }
    }else{
      if(element.indexOf('+') === -1){
        if(result.args === null){
          result.args = [element];
        }else{
          result.args.push(element);
        }
      }else{
        hadOptions = true;
        result.options = [{name: element, value: null}];
      }
    }
  }
  return result;
};

exports.Command = Command;
