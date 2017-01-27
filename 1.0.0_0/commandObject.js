var commands = require('./commands');

var Command = function(name, args, options, permission, method) {
  this.name = name || null;
  this.args = args || null;
  this.options = options || null;
  this.permission = permission || null;
  this.method = method || null;
};

exports.getCommand = (commandLine) => {
  var commandList = commands.commandList;
  var commandChoice = {};
  for(var index in commandList){
    if(commandLine.indexOf(commandList[index].name) !== -1){
      console.log(commandList[index].args || "no args");
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

exports.Command = Command;
