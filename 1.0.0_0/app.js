var Discordie = require('discordie');
const client = new Discordie();
const Events = Discordie.Events;

var commandObject = require('./commandObject');

client.connect({
  token: 'MjcyNDA5MDUyMzA1MjkzMzEy.C2UkNw.h7oWaH7BxeAXm4R6sBr96DZOI5E'
});

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log('Connected as: ' + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
  if(e.message.member === null || e.message.member.mute) return;
  if(e.message.content.indexOf("zp@") === -1) return;

  var command = commandObject.getCommand(e.message.content);
  console.log(command);
  // if(Object.keys(command).length === 0){
  //   utils.sendError(e, error.default.ERROR_NOT_FOUND);
  //   return;
  // }

});
