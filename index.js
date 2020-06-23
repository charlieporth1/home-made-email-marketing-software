const performance = require('perf_hooks').performance;
const csvP = require("csv-parse");
const fs = require("fs");
const {google} = require('googleapis');
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const keyFile = require("./mailer-8b8d34200771.json");
const menu = require('node-menu');
// const dialog = require('dialog');
const prompt = require('prompt');
const rootURL = 'http://bravo-279121.appspot.com/';//'http://localhost:8080/' //;
const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
// const jwt = new google.auth.JWT(process.env.CLIENT_EMAIL, null, process.env.PRIVATE_KEY, scopes);
const jwt = new google.auth.JWT(null, "./mailer-16f5dfb79beb.json", null, scopes);
const extJs = require("./uuidCSV");
const dirty = require("dirty");
const dataLog = dirty("data.db");

function getEmailSubject() {
    prompt.get(['subject'], function (err, result) {
        if (err) {
            return onErr(err);
        }
        console.log('Command-line input received:');
        console.log('  subject: ' + result.subject);
        return result.subject;
    });
}

const view_id = '220213875';

async function getData() {
    const response = await jwt.authorize();
    const result = await google.analytics('v3').data.ga.get({
        'auth': jwt,
        'ids': 'ga:' + view_id,
        'start-date': '30daysAgo',
        'end-date': 'today',
        'dimensions': 'ga:userDefinedValue,ga:eventAction',
        'metrics': 'ga:sessions,ga:users',
        'filters': 'ga:eventAction==open',
    });
    console.dir(result);
    console.dir(result.data)
    // console.dir(JSON.stringify(result))
}

// getData()
function onErr(err) {
    console.log(err);
    return 1;
}

function parseEmailList(filePath, emailField) {
    const parser = csvP({delimiter: ',', columns: true}, function (err, data) {
        console.log(data);
        console.log(data.email);
        return data.email;
    });
    return fs.createReadStream(filePath).pipe(parser);
}

function parseEmailsAndSendWithData(filePath, subject, htmlData) {


}

const {base64decode, base64encode} = require('nodejs-base64');
const mailPass = base64decode(base64decode(base64decode(base64decode('VmxjMVEyTXlUWGhVYkZaVFVtczFVVlJXVWxKTlJYUnVZbm93U3dvPQo='))));
let emailJs = require("emailjs");
let mailServer = emailJs.server.connect({
    user: "replies@studiosoapp.com",
    port: 587,
    password: mailPass,
    host: 'smtp.zoho.com',
    tls: true,
    ssl: false,
    timeout: 9000000
});

function findLinks(body, source, campaignName) {
    const words = body.toString().split(" ");
    let appendString = "";
    for (let word in words) {
        if (word.includes("http://") || word.includes("https://")) {
            word = generateCampaignLinkTracking(word, source, campaignName);
        }
        appendString += word;
    }
    return appendString;
}

function generateCampaignLinkTracking(link, source, campaignName, linkContentName) {
    // https://studiosoapp.com/?utm_source=this&utm_medium=email&utm_campaign=sample
    let fullLink = link.toString();
    if (((!fullLink.includes("https://")) && !fullLink.includes("http://"))) {
        fullLink = "https://" + fullLink;
    }
    if (fullLink.trim().substr(fullLink.length - 1, fullLink.length - 1) !== "/") {
        fullLink = fullLink + "/";
    }
    if (linkContentName) {
        return (fullLink + "?utm_source=" + source + "&utm_medium=email&utm_campaign=" + campaignName + "&utm_content=" + linkContentName);
    } else {
        return (fullLink + "?utm_source=" + source + "&utm_medium=email&utm_campaign=" + campaignName);
    }
}

function removeNonURLChars(url) {
    return encodeURIComponent(url.toString()).toString().toLowerCase(); //.replace(/[^a-zA-Z0-9-_]/g, '')
}

function encodeHex(string) {
    return new Buffer(string).toString('hex').toLowerCase(); // encoded === 54686973206973206d7920737472696e6720746f20626520656e636f6465642f6465636f646564
}

function decodeHex(encodedString) {
    return new Buffer(encodedString, 'hex').toString();
}

function saveData() {
    dataLog.on('drain', () => {
        console.log('All records are saved on disk now.');
    });
}

// const rootLink = generateCampaignLinkTracking("https://studiosoapp.com/", "scraper", "Test", "root_link");
// console.log("root link", rootLink);
function emailUserHtml(email, subject, htmlData, campaignName, data) {
    const source = "scraper";
    const rootLink = generateCampaignLinkTracking("https://studiosoapp.com/", source, campaignName, "root_link");
    let dt = removeNonURLChars(subject.toString().replace(" ", "_"));
    dt = dt.length > 1490 ? dt.substr(0, 1490).replace("_", "") : dt;
    console.log("root link", rootLink);
    console.log("dt ", dt);
    let count = 0;
    const cacheBuster = (generateUUIDB10().substr(0, 5) + generateUUIDB10().substr(0, 5) + generateUUIDB10().substr(0, 5));
    const pop = email.split("@")[0];
    const popEncode = encodeHex(base64encode(base64encode(pop)).toString().toLowerCase().substr(0, 20)).substr(0, 10);
    console.log("pop, popEncode, ", pop, popEncode);
    const analUrl = "https://www.google-analytics.com/collect?v=1&tid=UA-62107624-8&t=event&ec=email&ea=open&cid=" + data["uuid"] + "&cn=" + campaignName + "&cm=email&cs=" + source + "&dt=" + dt + "&uid=" + popEncode + "&z=" + cacheBuster;
    console.log("analURL ", analUrl);
    let trackingHtml = `<p><img alt="..." src="` + analUrl + `" width=1" height="1"/></p>`;
    let sigHtml = `<style>
img {
  display: inline-block;
}
</style>
<br> 
<br> 
    <a href="https://download-now.studiosoapp.com/download-student-app">Click here to download Studioso for Student</a> 
<br>  
<a href="https://download-now.studiosoapp.com/download-teacher-app">Click here to download Studioso for Teacher</a>
<br> 
<a href="` + rootLink + `">Click here to learn more about us from our website!</a>
<br> 

` + trackingHtml + `
<br><br><p>Thanks,</p>
    <p>The Studioso team</p>

        <img alt="Studioso's Logo" src="https://offload.cdn.studiosoapp.com/wp-content/uploads/2017/09/Studioso-logo-100x100.jpeg"
    width=100" height="100">`;
    /*<a href="https://studiosoapp.com/"></a>`;*/
    const body = findLinks(htmlData, "scraper", campaignName);
    // console.log("body", body);
    let message = {
        from: "Studioso for Music <replies@studiosoapp.com>",
        to: email,
        subject: subject,
        text: htmlData + trackingHtml,
        attachment:
            [
                {data: htmlData + sigHtml, alternative: true},
                // {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
            ]
    };
    if (count === 0) {
        mailServer.send(message, function (err, message) {
            console.log(err || message);
            count++;
            if (err) {
                dataLog.set("ERROR_EMAIL", email);
                dataLog.set("ERR", err);
                saveData();
                console.error("Error ", err);
                console.error("On email: ", email);
                console.error("On email: ", email);
                console.error("On email: ", email);
                console.error("On email: ", email);
                javascript_abort();
            }
        });
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function javascript_abort() {
    throw new Error('This is not an error. This is just to abort javascript');
}

function run() {
    prompt.get(['file', 'email', "campaign"], function (err, result) {
        if (err) {
            return onErr(err);
        }
        console.log('Command-line input received:');
        console.log('  file: ' + result.file);
        console.log('  emailField: ' + result.email);
        console.log('  campaign: ' + result.campaign.replace(" ", "_"));
        prompt.get(['subject'], function (err, result1) {
            if (err) {
                return onErr(err);
            }
            console.log('Command-line input received:');
            console.log('  subject: ' + result1.subject);
            console.log("Use a double period (..) for next line");
            prompt.get(['message'], function (err, result2) {
                if (err) {
                    return onErr(err);
                }
                console.log('Command-line input received:');
                console.log('  msg: ' + result2.message);
                const parser = csvP({
                    delimiter: ',',
                    columns: true,
                    relax_column_count: true,
                    trim: true
                }, function (err, data) {
                    if (err) console.error(err);
                    let listData = data;
                    console.log("data ", data);
                    let count = 0;
                    for (let data of listData) {
                        const t = 2750 * getRandomInt(3);
                        console.log("waiting ", t);
                        wait(t);
                        if (count % 10 === 0) {
                            const t = 1500 * getRandomInt(10);
                            console.log("waiting if ", t);
                            wait(t);
                        } else if (count % 5 === 0) {
                            const t = 1050 * getRandomInt(5);
                            console.log("waiting el if ", t);
                            wait(t);
                        } else {
                            const t = 500 * getRandomInt(30);
                            console.log("waiting el ", t);
                            wait(t);
                        }
                        console.log("data ", data);
                        const e = data[result.email].toString().toLowerCase().trim();
                        if (e) {
                            count = 0;
                            if (count === 0) {
                                count++;
                                emailUserHtml(e, result1.subject.trim(), (result2.message.toString().trim() + "  "), result.campaign.replace(" ", "_"), data);
                                const t = 100 * getRandomInt(10);
                                console.log("waiting e ", t);
                                wait(t);
                            }
                        }

                    }
                });
                fs.createReadStream(result.file.trim()).pipe(parser);
            });
        });
    });

}

// console.log("tracker === ", createTracker("charlieporth1@gmail.com"));

run();

function wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

function generateUUIDB10() { // Public Domain/MIT
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString();
    });
}

function createTracker(email) {
    const http = new XMLHttpRequest();
    const pop = email.split("@")[0];
    console.log("pop ", pop);
    const url = rootURL + "replies" + '/pixel';
    // http.addEventListener("load", parseMatrix);
    http.open("POST", url);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.send(JSON.stringify({email: email}));
    // http.onreadystatechange = (e) => {
    http.onreadystatechange = function first() {
        console.log("createTracker: http request this.status:  ", this.status);
        if (this.readyState === 4 && (this.status < 205)) {
            console.log("createTracker: http request http.responseText:  ", http.responseText);
            console.log("createTracker: http request http.response:  ", http.response);
            console.log("createTracker: http request http.responseCode:  ", http.responseCode);
            const http1 = new XMLHttpRequest();
            http1.open("GET", url + "/1");
            http1.send();
            http1.onreadystatechange = function second() {
                console.log("createTracker: http request http.responseText:  ", http1.responseText);
                console.log("createTracker: http request http.response:  ", http1.response);
                console.log("createTracker: http request http.responseCode:  ", http1.responseCode);
                console.log("createTracker: http request this.status:  ", this.status);
                return (http1.responseText.trim());
            };
        } else {
        }
    };
}