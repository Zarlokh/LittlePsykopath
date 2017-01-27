exports.commandList = [
  {
    "name": "zp@config",
    "permission": 10,
    "method": 'config',
  },
  {
    "name": "zp@rollmute",
    "options": [
      {
        name: "time",
        param: "number"
      }
    ],
    "permission": 10,
    "method": 'rollmute'
  },
  {
    "name": "zp@ping",
    "permission": 10,
    "method": 'ping'
  },
  {
    "name": "zp@shifumi",
    "args": ["players"],
    "options": [
      {
        name: "score",
        param: "number"
      }
    ],
    "permission": 10,
    "method": 'shifumi'
  },
  {
    "name": "zp@help",
    "permission": 10,
    "method": 'help'
  }
];
