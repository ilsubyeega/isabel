const getSongName = function(text){
    return text.split(' - ')[1].split(' [')[0];
};
const getArtist = function(text){
    return text.split(' - ')[0];
};
const getDiffName = function(text){
    return text.split(' - ')[1].split(' [').slice(1).join(' [').split(']').slice(0, -1).join(']');
};

module.exports = {
    getSongName: getSongName,
    getArtist: getArtist,
    getDiffName: getDiffName
};