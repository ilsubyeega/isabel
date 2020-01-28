const mysql2 = require('mysql2');
const configmanager = require('../utils/ConfigManager');
const Log = require('../utils/Log');
const mysqlprefix = Log.getPrefix("MySQL");
var pool = "null";

try {
    pool = mysql2.createPool(configmanager.config.mysql2);
} catch (e) {
    Log.error(mysqlprefix + " Error while creating connections");
    Log.error(mysqlprefix + " " + e);
    process.exit();
} finally {
    Log.log(mysqlprefix + " Connected to " + configmanager.config.mysql2.host);

};

module.exports = {
    pool: pool
};