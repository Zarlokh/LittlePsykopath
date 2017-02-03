var Errors = require('../models/errors.js');
var errorList = Errors.errorList;

var check = (command, template, messageObject, onlineMembers) => {
  if(
      command.args === null && template.args !== null ||
      command.args !== null && template.args === null ||
      command.args !== null && template.args !== null && command.args.length !== template.args.length
    ){
    return errorList[template.name.replace('zp@', '')].ERROR_SYNTAXE;
  }
  var isOk = true;
  for(var indexArgs in command.args){
    var commandArg = command.args[indexArgs];
    var templateArg = template.args[indexArgs];
    if(templateArg.type === "Player"){
      isOk = checkPlayer(messageObject, onlineMembers, commandArg);
      if(isOk !== true) return isOk;
    }else if(templateArg.type === 'number'){
      isOk = checkNumber(commandArg, template.name.replace('zp@', ''));
      if(isOk !== true) return isOk;
    }
  }
  return isOk;
};

var checkPlayer = (messageObject, onlineMembers, name) => {
  var isOk = false;
  if(messageObject.author.memberOf(messageObject.guild).nickMention === name){
    isOk = errorList.player.ERROR_AUTHOR_IS_PLAYER;
    return isOk;
  }
  for(var indexOnline in onlineMembers){
    var userMember = onlineMembers[indexOnline];
    if(userMember.nickMention === name){
      isOk = true;
      break;
    }
  }
  if(!isOk){
    isOk = errorList.player.ERROR_PLAYER_NOT_FOUND(commandArg, messageObject.guild.name);
  }
  return isOk;
};

var checkNumber = (number, commandName) => {
  return number.match(/^\d+$/) !== null ? true : errorList[commandName].ERROR_SYNTAXE;
};

exports.checkAndRun = (command, template, messageObject, onlineMembers) => {
  var isOk = check(command, template, messageObject, onlineMembers);
  if(isOk !== true){
    var errorObject = new Errors.Error(messageObject.author, isOk);
    errorObject.sendError();
    return;
  }else{
    command.method = template.method;
    command.process();
  }
};
