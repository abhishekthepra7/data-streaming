const { startEmittingService } = require("./emitterService");
const emitter = require("./helper/eventEmitter");
const { ancillaryService } = require("./ancillaryService");
const { asyncinitializeRedis } = require("./db");
const { packetSchema }  = require("./schema");
const { writeFileAfterCollating } = require("./downstreamService");

const redisClient = asyncinitializeRedis();

// Start emitting the data asynchronously so that we can receive them here
startEmittingService();

emitter.on("data", async (data) => {
    console.log("Received packet ", data);
    packetSchema.validate(data);
    const { primaryResourceId, payload, packetIndex, isLastPacket } = data;
    if (isLastPacket) await redisClient.set(`${primaryResourceId}:total`, packetIndex + 1)
    const processedPayload = ancillaryService(payload);
    await redisClient.rpush(primaryResourceId, JSON.stringify({ packetIndex, payload: processedPayload }));
    await redisClient.incr(`${primaryResourceId}:count`);
    if (await redisClient.get(`${primaryResourceId}:count`) === await redisClient.get(`${primaryResourceId}:total`)) {
        // this means we now have all packets processed by ansillary service hence it's time to collate & send
        const data = await redisClient.lrange(primaryResourceId, 0, -1);
        // Cleaning the relevant cache
        await redisClient.del(primaryResourceId);
        await redisClient.del(`${primaryResourceId}:count`);
        await redisClient.del(`${primaryResourceId}:total`);
        writeFileAfterCollating(data, primaryResourceId)
    }
});