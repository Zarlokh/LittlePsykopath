var config = require('./config');

exports.ping = e => {
  e.message.channel.sendMessage('Psykopong !');
}

exports.help = e => {

};

exports.rollmute = (e, client, args) => {
  args = args[0] || config.timeMute;
  var onlineMembers = client.Users.onlineMembersForGuild(e.message.guild).filter(function(element){
    return element.getVoiceChannel() !== null && !element.bot;
  });

  if(onlineMembers.length === 0){
    e.message.channel.sendMessage("Aucun utilisateur a mute :'(");
    return;
  }
  var random = Math.floor(Math.random() * (onlineMembers.length - 0)) + 0;
  e.message.channel.sendMessage("Nombre random : " + random +
                              "\nUtilisateur random : " + onlineMembers[random].username +
                              "\n" + onlineMembers[random].username + " a été mute pour " + args + " secondes");
}

exports.shifumi = e => {
  e.message.sendMessage('Veuillez saisir le nom des joueurs ("end" lorsque vous avez finis)');
}

exports.config = e => {
  var message = '########## Psyko Config ###########\n#\n';
  for(var property in config){
    message += "# [" + property + "] = " + config[property] + ";\n";
  }
  message += "#\n##############################";
  e.message.channel.sendMessage(message);
}

exports.psykoDefault = e =>{
  console.log(e.message.author.username + " a voulu utiliser la commande \"" + e.message.content + "\"");
}
