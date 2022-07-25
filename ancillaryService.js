// This is the synchronous ancillary service. It accepts a string 'data' and return it's words length in array 
module.exports.ancillaryService = function (data) {
    // Since data will be a string seperated by space
    const chunks = data.split(" ");
    return chunks.map(chunk => chunk.length);
};