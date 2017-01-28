var commands = require('../commands');

exports.sendError = (e, errorObject) => {
  var dm = e.message.member.openDM().then(dm => {
    dm.sendMessage(errorObject.message);
  }, rejet => {
    console.error("Erreur lors du DM : " + rejet);
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

exports.isOnlinePlayer = (playerName, guild) => {
  var onlineMembers = client.Users.onlineMembersForGuild(guild).forEach(function(user){
    console.log(user.username);
    if(user.username === playerName){
      return true;
    }
  });
  return true;
}
