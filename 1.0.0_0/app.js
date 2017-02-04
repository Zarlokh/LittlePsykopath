var Discordie = require('discordie');
const client = new Discordie({
  autoReconnect: true
});
const Events = Discordie.Events;

var commandObject = require('./models/commandObject');
var Errors = require('./models/errors');
var utils = require('./utils/functions');
var commandController = require('./controllers/commandController');

client.connect({
  token: 'MjcyNDA5MDUyMzA1MjkzMzEy.C2UkNw.h7oWaH7BxeAXm4R6sBr96DZOI5E'
});

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log('Connected as: ' + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
  if(e.message.author.bot) return;
  if(e.message.member === null || e.message.member.mute) return;
  if(e.message.content.slice(0, 3) !== 'zp@') return;

  var errorList = Errors.errorList;
  var commandTemplate = commandObject.getCommand(e.message.content);

  if(Object.keys(commandTemplate).length === 0){
    var errorObject = new Errors.Error(e.message.author, errorList.default.ERROR_NOT_FOUND);
    errorObject.sendError();
    return;
  }

  if(!utils.isAuthorized(e.message.member.roles, commandTemplate.permission)){
    var errorObject = new Errors.Error(e.message.author, errorList.default.ERROR_NOT_PERMITTED(commandTemplate.name));
    errorObject.sendError();
    return;
  }

  var command = commandObject.extractCommand(e.message.content);

  if(typeof command === "string"){
    var errorObject = new Errors.Error(e.message.author, errorList[command].ERROR_SYNTAXE);
    errorObject.sendError();
    return;
  }

  var onlineMembers = client.Users.onlineMembersForGuild(e.message.guild).filter(function(member){
    return  member.id !== e.message.author.id &&
            member.getVoiceChannel() !== null &&
            member.getVoiceChannel().id !== e.message.guild.afk_channel_id;
  });
  commandController.checkAndRun(command, commandTemplate, e.message, onlineMembers);
});
