const Redis = require("ioredis");

let client;
module.exports.asyncinitializeRedis = function () {
    if(client) return client;

//     client = createClient();
//     client.on('error', (err) => { console.log('Redis Client Error', err)});

// client.on('connect', function() {
//     console.log('Connected!');
//   });
    client = new Redis();
    return client;
}

