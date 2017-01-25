exports.error = {
  default: {
      ERROR_NOT_FOUND: { message: "Commande non trouvé.\nzp@help pour voir les commandes." },
      ERROR_NOT_PERMITTED: { message: "T'as cru que j'allais t'obéir pour cette commande, être inférieur que tu es ?!" }
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
  },
  commandList:{
    ERROR_UNDEFINED: { message: 'Erreur sur la commandList, undefined' }
  }
};
