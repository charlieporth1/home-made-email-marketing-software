module.exports.getRandomInt = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

module.exports.javascript_abort = function javascript_abort(reason) {
    throw new Error('This is not an error. This is just to abort javascript. Reason: ' + reason);
};


module.exports.removeNonURLChars = function removeNonURLChars(url) {
    return encodeURIComponent(url.toString()).toString().toLowerCase(); //.replace(/[^a-zA-Z0-9-_]/g, '')
};

module.exports.encodeHex = function encodeHex(string) {
    return new Buffer(string).toString('hex').toLowerCase(); // encoded === 54686973206973206d7920737472696e6720746f20626520656e636f6465642f6465636f646564
};

module.exports.decodeHex = function decodeHex(encodedString) {
    return new Buffer(encodedString, 'hex').toString();
};
module.exports.stringToBoolean = function stringToBoolean(string) {
    switch (string.toString().toLowerCase().trim()) {
        case "true":
        case "yes":
        case "1":
            return true;
        case "false":
        case "no":
        case "0":
        case null:
            return false;
        default:
            return Boolean(string);
    }
};
module.exports.wait = function wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
};
