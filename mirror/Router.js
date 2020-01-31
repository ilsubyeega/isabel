const router = require('./../worker/express').express.Router();
const asyncHandler = require('express-async-handler');
const ToDirect = require('./ToDirect');
const RawList = require('./raw/list');
const RawNow = require('./raw/now');

const isRequired = function (type, req) {
    if (type=="search") {
        if (typeof req.query.u == 'undefined' && req.query.u == null)
            return false;
        if (typeof req.query.h == 'undefined' && req.query.h == null)
            return false;
        if (typeof req.query.r == 'undefined' && req.query.r == null)
            return false;
        if (typeof req.query.m == 'undefined' && req.query.m == null)
            return false;
        if (typeof req.query.q == 'undefined' && req.query.q == null)
            return false;
        if (typeof req.query.p == 'undefined' && req.query.p == null)
            return false;
    }
    if (type=="search-set"){
        if (typeof req.query.u == 'undefined' && req.query.u == null)
            return false;
        if (typeof req.query.h == 'undefined' && req.query.h == null)
            return false;
        if (typeof req.query.b == 'undefined' && req.query.b == null)
            return false;
    }
    return true;
};

router.get('/osu-search.php', asyncHandler(async(req, res) => {
        if (isRequired("search", req)){
            var get = await RawList(req.query.r, req.query.m, req.query.q, req.query.p);
            res.status(200);
            res.send(ToDirect.ListToDirect(get));
        } else {
            res.status(200);
            res.send('');
        }
    }
));

router.get('/osu-search-set.php', asyncHandler(async(req, res) => {
        if (isRequired("search-set", req)){
            var get = await RawNow("b", req.query.b);
            res.status(200);
            res.send(ToDirect.nowPlayToDirect(get));
        } else {
            res.send('');
        }
    }
));
module.exports = router;

