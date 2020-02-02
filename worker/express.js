const express = require('express');
var app = express();
const Log = require('./../utils/Log');
var started = false;
var start = function(port){
    if (started === false) {
        started = true;
        try {
            app.listen(port);
        } catch (er) {
            Log.error(Log.getExpressPrefix + " Error while starting the Express Server.");
            Log.error(Log.getExpressPrefix + " " + er);
            process.exit();
        } finally {
            Log.log(Log.getExpressPrefix + " Express Server started at port " + port);
        }
    } else {
        Log.warning(Log.getExpressPrefix + " Express Server was alreay started!");
    }
};
module.exports = {
    start: start,
    express: express,
    app: app
};


app.use(function (req, res, next) {
    Log.debug(Log.getExpressPrefix + " " + req.ip + ": " + req.originalUrl);
    res.setHeader("X-Powered-By", "isabel (ilsubyeega)");
    res.setHeader("X-Version", "0.1b");
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.all('/', (req, res) => {
    res.status(200);
    res.send({
        "owo": "Whats this?"
    });
    return;
})
app.use('/api/', require('../api/osu/Router'));
app.use('/web/', require('../mirror/Router'));
app.use('/d/', require('../mirror/DownloadRouter'));
app.all('*', (req, res) => {
    res.status(404);
    res.send({
        "error": "API Not Found"
    });
    return;
});
