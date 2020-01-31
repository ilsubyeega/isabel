const SongnameUtil = require('./../utils/SongnameUtil');

const nowPlayToDirect = function(result){
    /*
    beatmapset_id: int
    artist: string
    songname: string
    creator: name
    ranked: int
    lastupdate: time
    hasvideo: int
    hasstoryboard: int
    filesize: int
     */
    if (result === '')
        return '';
    return `${result.beatmapset_id}.osz|` +
        `${result.artist}|${result.song_name}|` +
        `${result.creator}|${result.ranked}|10.00|${result.lastupdate}|${result.beatmapset_id}|${result.beatmapset_id}|${result.hasvideo === 1 ? 1 : 0}|` +
        `${result.hasstoryboard === 1 ? 1 : 0}|${result.filesize}|${result.hasvideo === 1 ? 7331 : ''}`;
};

/**
 * @return {string}
 */
const ListToDirect = function(results){
    /*
    beatmapset_id: int
    artist: string
    songname: string
    creator: name
    ranked: int
    lastupdate: time
    hasvideo: int
    hasstoryboard: int
    filesize: int
    difficulty: Diffculty Array

    Difficulty Array (requied):
    new Array() {
        {
            name: string,
            mode: int
        }...
    }
     */
    let diffstring = '';
    let owo = 0;

    for (let i = 0; i < results.length; i++) {
        owo += results[i].difficulty.length;
    }

    let resultstring = `${owo}`;
    for (let i = 0; i < results.length; i++) {
        diffstring = '';
        for (let h = 0; h < results[i].difficulty.length; h++) {
            if (h > 0)
                diffstring += ",";
            diffstring += `${results[i].difficulty[h].name}@${results[i].difficulty[h].mode}`;
        }
        resultstring += `\n${results[i].beatmapset_id}.osz|` +
            `${results[i].artist}|${results[i].song_name}|` +
            `${results[i].creator}|${results[i].ranked}|9.52416|${results[i].lastupdate}|${results[i].beatmapset_id}|${results[i].beatmapset_id-1000}|` +
            `${results[i].hasvideo === 1 ? 1 : ''}|${results[i].hasstoryboard === 1 ? 1 : ''}|${results[i].filesize}|${results[i].hasvideo === 1 ? 7331 : ''}|${diffstring}`;
    }
    return resultstring;
};

module.exports = {
    nowPlayToDirect: nowPlayToDirect,
    ListToDirect: ListToDirect
};