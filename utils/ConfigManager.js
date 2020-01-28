var config;
const Log = require("./Log");
const configprefix = Log.getPrefix("ConfigManager");
var checkConfig = function () {
    try {
        config = require('./../config.json');
    } catch (e) {
        Log.error(Log.getPrefix("Config") + " Error while loading the config.");
        Log.error(Log.getPrefix("Config") + " " + e);
        process.exit();
    }
    a = "";
    try { // it was gay
        if (typeof config.mysql2.host === "undefined")
            a += "mysql.host is not set";
        if (typeof config.mysql2.user === undefined)
            a += "mysql.user is not set";
        if (typeof config.mysql2.password === undefined)
            a += "mysql.password is not set";
        if (typeof config.mysql2.database === undefined)
            a += "mysql.database is not set";
        if (typeof config.mysql2.waitForConnections === undefined)
            a += "mysql.waitForConnections is not set";
        if (typeof config.mysql2.connectionLimit === undefined)
            a += "mysql.connectionLimit is not set";
        if (typeof config.mysql2.queueLimit === undefined)
            a += "mysql.queueLimit is not set";
        if (typeof config.express.enableUrlLog === undefined)
            a += "express.enableUrlLog is not set";
        if (typeof config.express.port === undefined)
            a += "express.port is not set.";
        if (typeof config.mirror.type === undefined) {
            a += "mirror.type is not set.";
        } else {
            if (config.mirror.type === "bloodcat") {
                // null
            } else if (config.mirror.type === "beatconnect") {
                if (typeof config.mirror.api_key == null)
                    a += "Beatconnect API Key is not found\n";
            } else {
                a += config.mirror.type + " is not a supported mirror type.\n";
            }
        }
    } catch (e) {
        a += e;
    }

    if (!a == "" || !a == null) {
        Log.error(configprefix + " Error from parsing the config.");
        for (i = 0; i < a.split("\n").length; i++) {
            if (!a.split("\n")[i] == "")
                Log.error(configprefix + " " + a.split("\n")[i]);
        }
        process.exit();
    } else {
        Log.log( configprefix + " Successfully parsed the config.");
    }
};

checkConfig();
module.exports = {
    config: config
};