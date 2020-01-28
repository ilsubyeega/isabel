const Log = require('./utils/Log');
Log.startMsg();
const expressmodule = require('./worker/express.js');
const configmanager = require('./utils/ConfigManager');
const mysql2 = require('./worker/mysql2');
const cli = require('cli-color');

expressmodule.start(81);
mysql2.createConnection();