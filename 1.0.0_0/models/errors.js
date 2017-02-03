var notPermitted = (commandName) => {
  return { message: "Vous n'avez pas les droits appropriés pour utiliser la commande \"" + commandName + "\"" };
}

var playerNotFound = (playername, guild) => {
  return { message: "Joueur \"" + playername +
  "\" non trouvé. Cette personne doit être connecté au serveur \"" + guild + "\" et dans un salon vocal autre que celui pour AFK et ne doit pas être absent."};
}

var Error = function(author, messageObject){
  this.messageObject = messageObject || null;
  this.author = author || null;

  this.sendError = () => {
    if(this.messageObject === null || this.author === null){
      console.log("[ERREUR] Message ou author null !");
      return;
    }
    var dm = this.author.openDM().then(dm => {
      dm.sendMessage(this.messageObject.message);
    }, rejet => {
      console.error("Erreur lors du DM : " + rejet);
    });
  };
};

exports.errorList = {
  default: {
      ERROR_NOT_FOUND: { message: "Commande non trouvé.\nzp@help pour voir les commandes." },
      ERROR_NOT_PERMITTED: notPermitted
  },
  player: {
    ERROR_AUTHOR_IS_PLAYER: { message: "L'auteur du message est automatiquement un joueur." },
    ERROR_PLAYER_NOT_FOUND: playerNotFound
  },
  rollmute: {
      ERROR_SYNTAXE: { message: "Trop d'arguments.\nSyntaxe : zp@rollmute [<timeMute>]" },
      ERROR_ARGS_FORMAT: { message: "L'argument [timeMute] doit être un nombre." }
  },
  shifumi: {
    ERROR_SYNTAXE: { message: "Erreur de syntaxe : \nzp@shifumi <@Player2> [+score <number>]"}
  },
  ping: {
    ERROR_SYNTAXE: { message: "Erreur de syntaxe : \nzp@ping" }
  },
  help: {
    ERROR_SYNTAXE: { message: "Erreur de syntaxe : \nzp@help" }
  }
};

exports.Error = Error;
