var Discordie = require('discordie');
var utils = require('./utils/functions');
var commands = require('./commands');
var config = require('./config');
var errors = require('./errors');
var comandsList = require('./commandList');

const Events = Discordie.Events;
const client = new Discordie();

const error = errors.error;

const commandList = comandsList.commandList;

client.connect({
  token: 'MjcyNDA5MDUyMzA1MjkzMzEy.C2UkNw.h7oWaH7BxeAXm4R6sBr96DZOI5E'
});

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log('Connected as: ' + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
  if(e.message.member === null || e.message.member.mute) return;
  if(e.message.content.indexOf("zp@") === -1) return;

  var command = utils.getCommand(e.message.content);
  if(Object.keys(command).length === 0){
    utils.sendError(e, error.default.ERROR_NOT_FOUND);
    return;
  }

  if(!utils.isAuthorized(e.message.member.roles, command.permission)){
    utils.sendError(e, error.default.ERROR_NOT_PERMITTED);
    return;
  }

  var isOk = utils.check(command.name, e.message.content);
  if(isOk !== true){
    utils.sendError(e, isOk);
  }else{
    commands[command.method](e);
  }
/*  if(e.message.content[0] !== ".") return;
  if(typeof(config.exceptionPlayer[e.message.author.username]) === 'undefined' && !utils.isAuthorized(e.message.member.roles)) return;

  var mention = e.message.author.mention;
  console.log(client.Users.find(e => {
    return e.mention === mention;
  }));

  var commande = e.message.content;

  if(commande === '.psykoping'){
    commands.psykoping(e);
  }else if(commande.indexOf('.psykoRollMute') !== -1){
    var args = commande.split(' ').slice(1);
    if(args.length > 1){
      utils.sendError(e, error.psykoRollMute.ERROR_SYNTAXE);
    }else if(args.length === 1 && !Number.isInteger(parseInt(args[0]))){
      utils.sendError(e, error.psykoRollMute.ERROR_ARGS_FORMAT)
    }else{
      commands.psykoRollMute(e, client, args);
    }
  }else if(commande.indexOf('.psykoShiFuMi') !== -1){
    var args = commande.split(' ').slice(1);
    if(args.length < 2){
      utils.sendError(e, error.psykoShiFuMi.ERROR_SYNTAXE);
    }else{
      console.log(client.Users.getMember(e.message.guild, args[0]));
    }
  }else if(commande.indexOf(".psykoConfig") !== -1){
    commands.psykoConfig(e);
  }else{
    commands.psykoDefault(e);
  }*/
});
