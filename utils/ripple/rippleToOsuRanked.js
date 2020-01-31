const rippleRankedToOsuRanked = function(int){
    switch (parseInt(int)){
        default: // Graveyard
            return -2;
        case 2: // Ranked
            return 1;
        case 3: // Approved
            return 2;
        case 4: // Qualified
            return 3;
        case 5: // Loved
            return 4;

    }
}

module.exports = rippleRankedToOsuRanked;