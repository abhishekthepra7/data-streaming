// This service will create data packets from input files
const fs = require('fs');
const emitter = require("./helper/eventEmitter");
const { v4: uuidv4 } = require('uuid');
const random = require("random");

function readFileAndEmit(path) {
    const data = fs.readFileSync(path, {encoding:'utf8'});
    const chunks = data.split(/\r?\n/);
    const primaryResourceId = uuidv4();
    chunks.forEach((chunk, index) => {
        // max wait time for setTimeout is 60 seconds
        setTimeout(function() {
            // send the data packet after some time, max gap is 60 seconds
            const packet = {
                primaryResourceId,
                payload: chunk,
                packetIndex: index,
                isLastPacket: index === chunks.length-1 ? true : false,
            }
            emitter.emit("data", packet);
        }, random.int(0,60000))
    })
}
module.exports.startEmittingService = function() {
    readFileAndEmit("./input/file1.txt");
    readFileAndEmit("./input/file2.txt");
}


