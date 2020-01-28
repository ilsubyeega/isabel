var pool = require('./../../worker/mysql2').pool;
const router = require('../../worker/express').express.Router();
const songnameutils = require('../../utils/SongnameUtil');
/*
 URL: /api/osu/get_beatmaps
 Title: get Beatmaps
 Description: get Beatmaps
 s or b or h must be included at parameters
 Required Parameters:

 Optional
    s = beatmapset_id
    b = beatmap_id
    h = beatmap_hash (For Beatmap md5)
    l = Amout of Results (If not set, 100)

 */
/**
 * @return {boolean}
 */
const ParamCheck = function (req) {

    return !(!parseInt(req.query.s) > 0 && !parseInt(req.query.b) > 0 && req.query.h == null);


};
const getColumn = function (req) {
    if (parseInt(req.query.s) > 0)
        return "beatmapset_id";
    if (parseInt(req.query.b) > 0)
        return "beatmap_id";
    if (typeof req.query.h !== 'undefined' && req.query.h !== null)
        return "beatmap_md5";
    return null;
};
const getValue = function (req) {
    if (parseInt(req.query.s) > 0)
        return req.query.s;
    if (parseInt(req.query.b) > 0)
        return req.query.b;
    if (typeof req.query.h !== 'undefined' && req.query.h !== null)
        return req.query.h;
    return null;
};

router.all('/get_beatmaps', (req, res) => {
    res.status(200);
    if (ParamCheck(req)) {

        if (pool === "null")
            pool = require('./../../worker/mysql2').pool;

        pool.execute(
            "SELECT  `id`,  `beatmap_id`,  `beatmapset_id`,  `beatmap_md5`,  `song_name`,  `ar`,  `od`,  `mode`,  " +
            "`rating`, `max_combo`,  `hit_length`,  `bpm`,  `ranked`,  `latest_update`,  `ranked_status_freezed`,  `playcount`,  `disable_pp`,  " +
            "`ranked_by` FROM `beatmaps` WHERE " + getColumn(req) + "=? LIMIT ?",
            [getValue(req), (parseInt(req.query.l) > 0 ? req.query.l : 100)],
            function (err, results) {
                if (err) throw err;

                if (results.length > 0) {
                    var a = {
                        artist: songnameutils.getArtist(results[0].song_name),
                        song_anme: songnameutils.getSongName(results[0].song_name),
                        beatmapset_id: results[0].beatmapset_id,
                        bpm: parseInt(results[0].bpm),
                        difficulty: new Array()
                    }
                }
                for (var i = 0; i < results.length; i++) {

                    a.difficulty.push(
                        {
                            name: songnameutils.getDiffName(results[i].song_name),
                            beatmap_id: results[i].beatmap_id,
                            ar: results[i].ar,
                            od: results[i].od,
                            mode: results[i].mode,
                            rating: results[i].rating,
                            max_combo: results[i].max_combo,
                            ranked: results[i].ranked,
                            ranked_by: results[i].ranked_by
                        }
                    );
                    var row = results[i];
                }
                res.send(a);
                // If you execute same statement again, it will be picked from a LRU cache
                // which will save query preparation time and give better performance
            }
        );
    } else {
        res.status(404);
        res.send(
            {
                "error": "Wrong Parameters."
            }
        );
    }
    return;
});


module.exports = router;
