const songNameUtil = require('./../../utils/SongnameUtil');
const pool = require('./../../worker/mysql2').pool;
const rippleToOsuRanked = require('./../../utils/ripple/rippleToOsuRanked');
/*

question could be Newest, Top+Rated, Most+Played.


 */
const timetoString = function(time){
    return `2020-01-19T16:17:07`;
}
const getList = function(id, question){
    return new Promise((resolve, reject) => {
        const resolvestring = "beatmap_id";
        pool.execute(
            "SELECT  `id`,  `beatmap_id`,  `beatmapset_id`,  `beatmap_md5`,  `song_name`,  `ar`,  `od`,  `mode`,  " +
            "`rating`, `max_combo`,  `hit_length`,  `bpm`,  `ranked`,  `latest_update`,  `ranked_status_freezed`,  `playcount`,  `disable_pp`,  " +
            "`ranked_by` FROM `beatmaps` WHERE `" + resolvestring + "`=?",
            [question],
            function (err, results) {

                if (err) throw err;
                let result;
                if (results.length > 0) {
                    result = {
                        beatmapset_id: results[0].beatmapset_id,
                        artist: songNameUtil.getArtist(results[0].song_name),
                        song_name: songNameUtil.getSongName(results[0].song_name),
                        creator: "Unknown",
                        ranked: rippleToOsuRanked(results[0].ranked),
                        lastupdate: timetoString((new Date())),
                        hasvideo: 0,
                        hasstoryboard: 0,
                        filesize: 1,
                        difficulty: songNameUtil.getDiffName(results[0].song_name)
                    };
                } else {
                    result = '';

                }
                resolve(result);
            }
        );
    });
};

module.exports = getList;



