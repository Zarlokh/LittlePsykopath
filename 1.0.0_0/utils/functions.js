var commands = require('../config/commands');

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
