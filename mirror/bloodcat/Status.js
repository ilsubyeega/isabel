const https = require('https');


const getMD = function(beatmapsetid){
    return new Promise((resolve, reject) => {
        const id = beatmapsetid;
        https.get(`https://bloodcat.com/osu/?mod=json&q=${id}&c=s&p=1&s=&m=&g=&l=`, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                try {
                    console.log(JSON.parse(data)[0].beatmaps[0].hash_md5);
                    resolve(JSON.parse(data)[0].beatmaps[0].hash_md5);
                } catch (e) {
                    resolve(null);
                }
            });

        }).on("error", (err) => {
            reject("Error: " + err.message);
        })
    });
};

const isExists = function(beatmapsetid){
    return new Promise((resolve, reject) => {
        const id = beatmapsetid;
        https.get(`https://bloodcat.com/osu/?mod=json&q=${id}&c=s&p=1&s=&m=&g=&l=`, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                try {
                    JSON.parse(data)[0].beatmaps[0].hash_md5;
                    resolve(true);
                } catch (e) {
                    resolve(false);
                }
            });

        }).on("error", (err) => {
            reject("Error: " + err.message);
        })
    });
};

module.exports = {
    getMD: getMD,
    isExists: isExists
};