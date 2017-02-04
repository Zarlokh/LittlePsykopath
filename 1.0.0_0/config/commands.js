exports.commandList = [
  {
    "name": "zp@config",
    "permission": 8,
    "method": 'config',
  },
  {
    "name": "zp@rollmute",
    "options": [
      {
        name: "time",
        type: "number"
      }
    ],
    "permission": 10,
    "method": 'rollmute'
  },
  {
    "name": "zp@ping",
    "permission": 8,
    "method": 'ping'
  },
  {
    "name": "zp@shifumi",
    "args": [
      {
        name: "player2",
        type: "Player"
      }
    ],
    "options": [
      {
        name: "score",
        type: "number"
      }
    ],
    "permission": 8,
    "method": 'shifumi'
  },
  {
    "name": "zp@help",
    "permission": 8,
    "method": 'help'
  }
];
