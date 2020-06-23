const csvP = require("csv-parse");
const performance = require('perf_hooks').performance;
const fs = require("fs");
module.exports.ifUUIDNotExistMergeCSVWithUUID = function (file, emailField) {
    let output = [];
    const parser = csvP({
        delimiter: ',',
        columns: true,
        relax_column_count: true,
        trim: true
    }, function (err, data) {
        let list = data;
        console.log("data ", data);
        let count = 0;
        for (let data of list) {

        }
    });
    fs.createReadStream(file.trim()).pipe(parser);
};
module.exports.generateUUID = () => {
    return generateUUID();
};
function generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}