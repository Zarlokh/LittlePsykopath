var config = require('../config');
var errors = require('../errors');
var commandsList = require('../commandList');

exports.sendError = (e, errorObject) => {
  var dm = e.message.member.openDM().then(dm => {
    dm.sendMessage(errorObject.message);
  }, rejet => {
    console.error("Rejet : " + rejet);
  });
};

exports.isAuthorized = (roles, permission) => {
  var isOk = false;
  for(var indexRole in roles){
    var irole = roles[indexRole];
    if(irole.position >= permission){
      isOk = true;
      break;
    }
  }
  return isOk;
};

exports.getCommand = (commandLine) => {
  var commandList = commandsList.commandList;
  var commandChoice = {};
  for(var index in commandList){
    if(commandLine.indexOf(commandList[index].name) !== -1){
      commandChoice = commandList[index];
      break;
    }
  }
  return commandChoice;
};

exports.check = (commandName, commandLine) => {
  var isOk = true;
  switch(commandName){
    case 'zp@config':
      isOk = checkConfig(commandLine);
    break;
    case 'zp@rollmute':
      isOk = checkRollMute(commandLine);
    break;
    case 'zp@ping':
      isOk = checkEquals(commandLine, commandName);
    break;
    case 'zp@shifumi':
      isOk = checkShifumi(commandLine);
    break;
    case 'zp@help':
      if(typeof commandsList.commandList === 'undefined'){
        isOk = errors.error.commandList.ERROR_UNDEFINED;
        break;
      }
      isOk = checkEquals(commandLine, commandName);
    break;
    default:
      isOk = errors.error.default.ERROR_NOT_FOUND;
    break;
  }
  return isOk;
};

var checkEquals = (commandLine, command) => {
  if(commandLine !== command){
    return errors.error[command.replace('zp@', '')].ERROR_SYNTAXE;
  }else{
    return true;
  }
}

var checkRollMute = (commandLine) => {
  var args = commandLine.split(' ').slice(1);
  var commandObject = false;
  if(args.length > 1){
    commandObject = error.psykoRollMute.ERROR_SYNTAXE;
  }else if(args.length === 1 && !Number.isInteger(parseInt(args[0]))){
    commandObject = error.psykoRollMute.ERROR_ARGS_FORMAT;
  }else{
    commandObject = createCommandObject(commandLine);
  }
  return commandObject;
};
