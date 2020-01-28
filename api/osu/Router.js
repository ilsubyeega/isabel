const router = require('../../worker/express').express.Router();



router.all('/f', (req, res) => {
    res.status(403);
    res.send('API dsasdasdas Found');
    return;
});


module.exports = router;

