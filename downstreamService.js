const fs = require("fs");

// A function for collating the data from ansilary service and writing to downstream service
module.exports.writeFileAfterCollating = function (packets, filename, extension = ".txt", directory = "output/") {
    packets = packets.map(packet => JSON.parse(packet));
    packets.sort((packetA, packetB) => {
        if (packetA.packetIndex > packetB.packetIndex) return 1;
        return -1;
    })
    const file = fs.createWriteStream(directory+filename+extension);

    file.on('error', (err) => {
        console.log("error is", err);
    });

    packets.forEach((packet) => {
        packet.payload.forEach((element) => {
            file.write(element + '\n');
        })
    });

    file.end();
};