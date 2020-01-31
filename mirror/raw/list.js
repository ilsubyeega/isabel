const songNameUtil = require('./../../utils/SongnameUtil');
const pool = require('./../../worker/mysql2').pool;
const rippleToOsuRanked = require('./../../utils/ripple/rippleToOsuRanked');
/*

question could be Newest, Top+Rated, Most+Played.


 */
const timetoString = function(time){
    return `2020-01-19T16:17:07`;
}
const getList = function(ranked, osumode, question, pages){
    return new Promise((resolve, reject) => {
        let query = "SELECT  `id`,  `beatmap_id`,  `beatmapset_id`,  `beatmap_md5`,  `song_name`,  `ar`,  `od`,  `mode`,  " +
            "`rating`, `max_combo`,  `hit_length`,  `bpm`,  `ranked`,  `latest_update`,  `ranked_status_freezed`,  `playcount`,  `disable_pp`,  " +
            "`ranked_by` FROM `beatmaps` WHERE ";
        let modeid = 0;
        if (osumode == -1) {
            query += "`mode`>=?";
        } else {
            query += "`mode`=?";
            modeid = osumode;
        }
        let rankid;
        query += " AND ";
        switch (parseInt(ranked)) {
            default:
            case 4: // All
                query += "`ranked` >= ?";
                rankid = 0;
                break;
            case 0: // Ranked
            case 7: // Ranked (Played)
                query += "`ranked` = ?";
                rankid = 2;
                break;
            case 8: // Loved
                query += "`ranked` = ?";
                rankid = 5;
                break;
            case 3: // Qualified
                query += "`ranked` = ?";
                rankid = 4;
                break;
            case 2: // Pending
            case 5: // Graveyard
                query += "`ranked` = ?";
                rankid = 0;
                break;
        }
        let arg;
        if (question === "Newest") {
            query += " ORDER BY ? DESC";
            arg = 'id';
        } else if (question === "Top+Rated" || question === "Top+Rated") {
            // Current rating is rating is disabled from ruri lmfao
            query += " ORDER BY ? DESC";
            arg = 'id';
        } else if (question === "Most+Played" || question === "Most Played") {
            // Current most played is rating is disabled from ruri lmfao 22
            query += " ORDER BY ? DESC";
            arg = 'id';
        } else {
            query += " AND `song_name` LIKE ? ORDER BY `id` DESC";
            arg = `%${question}%`;
        }

        query += " LIMIT ?, ?;";
        arg2 = parseInt(pages) * 250;
        arg3 = (parseInt(pages) + 1) * 250;
        let lastbeatmapsetid;
        let lastdiffarray = new Array();
        pool.execute(
            query,
            [modeid, rankid, arg, arg2, arg3],
            function (err, results) {

                if (err) throw err;
                let result;
                if (results.length > 0) {
                    result = new Array();
                    for (var i = 0; i < results.length; i++) {
                        if (i == 0)
                            lastbeatmapsetid = results[i].beatmapset_id;
                        if (lastbeatmapsetid !== results[i].beatmapset_id) {

                            lastbeatmapsetid = results[i].beatmapset_id;
                            result.push({
                                beatmapset_id: results[i-1].beatmapset_id,
                                artist: songNameUtil.getArtist(results[i - 1].song_name),
                                song_name: songNameUtil.getSongName(results[i - 1].song_name),
                                creator: "Unknown",
                                ranked: rippleToOsuRanked(results[i - 1].ranked),
                                lastupdate: timetoString((new Date())),
                                hasvideo: 0,
                                hasstoryboard: 0,
                                filesize: 1,
                                difficulty: lastdiffarray
                            });
                            lastdiffarray = new Array();

                        }
                        lastdiffarray.push({
                            name: songNameUtil.getDiffName(results[i].song_name),
                            mode: results[i].mode
                        });
                    }

                    if (results.length > 1) {
                        result.push({
                            beatmapset_id: results[i-1].beatmapset_id,
                            artist: songNameUtil.getArtist(results[results.length - 1].song_name),
                            song_name: songNameUtil.getSongName(results[results.length - 1].song_name),
                            creator: "Unknown",
                            ranked: rippleToOsuRanked(results[results.length - 1].ranked),
                            lastupdate: timetoString((new Date())),
                            hasvideo: 0,
                            hasstoryboard: 0,
                            filesize: 1,
                            difficulty: lastdiffarray
                        });
                    }


                } else {
                    result = '';

                }
                resolve(result);
            }
        );
    });
};

module.exports = getList;



