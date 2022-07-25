const joi = require("joi");

module.exports.packetSchema = joi.object({
    primaryResourceId: joi.string()
        .alphanum()
        .required(),

    payload: joi.array()
        .required(),

    packetIndex: joi.number().integer().required(),
    isLastPacket: joi.boolean().required()
});