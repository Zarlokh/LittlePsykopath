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

exports.highestPermission = (roles) => {
  var role = null;
  for(var index in roles){
    if(role === null || (role !== null && role < roles[index].position) ){
      role = roles[index].position;
    }
  }
  return role;
}
