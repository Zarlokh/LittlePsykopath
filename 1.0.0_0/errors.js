var notPermitted = (commandName) => {
  return { message: "Vous n'avez pas les droits appropriés pour utiliser la commande \"" + commandName + "\"" };
}

exports.errorList = {
  default: {
      ERROR_NOT_FOUND: { message: "Commande non trouvé.\nzp@help pour voir les commandes." },
      ERROR_NOT_PERMITTED: notPermitted
  },
  rollmute: {
      ERROR_SYNTAXE: { message: "Trop d'arguments.\nSyntaxe : zp@rollmute [<timeMute>]" },
      ERROR_ARGS_FORMAT: { message: "L'argument [timeMute] doit être un nombre." }
  },
  shifumi: {
    ERROR_SYNTAXE: { message: "Erreur de syntaxe : \nzp@shifumi <Player1> <Player2> [<Player3> ...]"}
  },
  ping: {
    ERROR_SYNTAXE: { message: "Erreur de syntaxe : \nzp@ping" }
  },
  help: {
    ERROR_SYNTAXE: { message: "Erreur de syntaxe : \nzp@help" }
  }
};
