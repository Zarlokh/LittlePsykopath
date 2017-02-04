var commands = require('../config/commands');
var utils = require('../utils/functions');
var Error = require('./errors');
var configFile = require('../config/config');

var Command = function(name, args, options, permission, method) {
  this.name = name || null;
  this.args = args || null;
  this.options = options || null;
  this.permission = permission || null;
  this.method = method || null;

  this.process = (messageObject) => {
      eval(this.method)(messageObject);
  };

  var ping = (messageObject) => {
    messageObject.channel.sendMessage('PsykoPong...');
  };

  var config = (messageObject) => {
    var message = "Configuration :\n";
    for(var property in configFile){
      message += property + " = \"" + configFile[property] + "\";\n"
    }
    messageObject.channel.sendMessage(message);
  };

  var help = (messageObject) => {
    var channel = messageObject.channel;
    var permission = utils.highestPermission(messageObject.author.memberOf(messageObject.guild).roles);
    var commandList = commands.commandList;
    var message = "Liste des commandes disponibles :\n";
    for(var index in commandList){
      var command = commandList[index];
      if(command.permission > permission) continue;

      message += command.name + " ";
      for(var indexArgs in command.args){
        var arg = command.args[indexArgs];
        message += arg.name + " ";
      }
      for(var indexOptions in command.options){
        message += "[";
        var option = command.options[indexOptions];
        message += "+" + option.name + " ";
        if(option.type !== ""){
          message += option.type;
        }
        message += "] ";
      }
      message += "\n";
    }
    channel.sendMessage(message);
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
