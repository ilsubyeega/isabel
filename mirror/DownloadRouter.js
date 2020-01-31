const router = require('./../worker/express').express.Router();
const asyncHandler = require('express-async-handler');
const BloodcatStatus = require('./bloodcat/Status');

router.all('/:id', asyncHandler(async(req, res) => {
    if (isNaN(req.params.id)){
        res.send('');
        res.status(500);
    } else {
        var a = await BloodcatStatus.isExists(req.params.id);
        if (a) {
            res.redirect('https://bloodcat.com/osu/s/' + req.params.id); // Bloodcat <3
        } else {
            res.redirect('https://beatconnect.io/b/' + req.params.id); // Thank you
        }
        //https://bloodcat.com/osu/b/2130089
    }
}
));

module.exports = router;

