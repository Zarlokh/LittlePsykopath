var Discordie = require('discordie');
global.client = new Discordie({
  autoReconnect: true
});
const Events = Discordie.Events;

var commandObject = require('./commandObject');
var errors = require('./errors');
var utils = require('./utils/functions');

client.connect({
  token: 'MjcyNDA5MDUyMzA1MjkzMzEy.C2UkNw.h7oWaH7BxeAXm4R6sBr96DZOI5E'
});

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log('Connected as: ' + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
  if(e.message.member === null || e.message.member.mute) return;
  if(e.message.content.indexOf("zp@") === -1) return;

  var errorList = errors.errorList;
  var commandTemplate = commandObject.getCommand(e.message.content);

  if(Object.keys(commandTemplate).length === 0){
    utils.sendError(e, errorList.default.ERROR_NOT_FOUND);
    return;
  }

  if(!utils.isAuthorized(e.message.member.roles, commandTemplate.permission)){
    utils.sendError(e, errorList.default.ERROR_NOT_PERMITTED(commandTemplate.name));
    return;
  }

  var command = commandObject.extractCommand(e.message.content);

  if(typeof command === "string"){
    utils.sendError(e, errorList[command].ERROR_SYNTAXE);
    return;
  }

  var isOk = command.check(commandTemplate, e.message.guild);
  console.log(isOk);
  if(isOk !== true){
    utils.sendError(e, errorList[isOk].ERROR_SYNTAXE);
    return;
  }

});
