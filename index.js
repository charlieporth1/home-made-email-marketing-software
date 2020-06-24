require('dotenv').config();
const performance = require('perf_hooks').performance;
const csvP = require("csv-parse");
const fs = require("fs");
const {google} = require('googleapis');
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const menu = require('node-menu');
const ef = require("./external_functions");
// const dialog = require('dialog');
const prompt = require('prompt');
const rootURL = 'http://bravo-279121.appspot.com/';//'http://localhost:8080/' //;
const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
// const jwt = new google.auth.JWT(process.env.CLIENT_EMAIL, null, process.env.PRIVATE_KEY, scopes);
const jwt = new google.auth.JWT(null, "./mailer-16f5dfb79beb.json", null, scopes);
const extUuid = require("./uuidCSV");
const dirty = require("dirty");
const dataLog = dirty("data.db");
const analyticsTracker = process.env.ANALYTICS_TRACKER;
const view_id = '220213875';
const companyWebsite = process.env.COMPANY_WEBSITE;
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

const {base64decode, base64encode} = require('nodejs-base64');
const mailPass = base64decode(base64decode(base64decode(base64decode(process.env.ENCODED_PASSWORD))));
let emailJs = require("emailjs");
let mailServer = emailJs.server.connect({
    user: process.env.SENDER_EMAIL,
    port: 587,
    password: mailPass,
    host: process.env.SMTP_SERVER,
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


function saveData() {
    dataLog.on('drain', () => {
        console.log('All records are saved on disk now.');
    });
}

// const rootLink = generateCampaignLinkTracking("https://studiosoapp.com/", "scraper", "Test", "root_link");
// console.log("root link", rootLink);
function emailUserHtml(email, subject, htmlData, campaignName, data) {
    if (campaignName.toString().trim().length > 99 ) {
        ef.javascript_abort("campaignName must be less than 100 bytes")
    }
    const source = "scraper";
    const rootLink = generateCampaignLinkTracking(companyWebsite, source, campaignName, "root_link");
    let dt = ef.removeNonURLChars(subject.toString().replace(" ", "_"));
    dt = dt.length > 1490 ? dt.substr(0, 1490).replace("_", "") : dt;
    console.log("root link", rootLink);
    console.log("dt ", dt);
    let count = 0;
    const cacheBuster = (extUuid.generateUUIDB10().replace("-", "").trim().substr(0, 15));
    const pop = email.split("@")[0];
    const popEncode = ef.encodeHex(base64encode(base64encode(pop)).toString().toLowerCase().substr(0, 20)).substr(0, 10);
    console.log("pop, popEncode, ", pop, popEncode);
    const analUrl = "https://www.google-analytics.com/collect?v=1&tid=" + analyticsTracker + "&t=event&ec=email&ea=open&cid=" + data["uuid"] + "&cn=" + campaignName + "&cm=email&cs=" + source + "&dt=" + dt + "&uid=" + popEncode + "&z=" + cacheBuster;
    console.log("analURL ", analUrl);
    let trackingHtml = `<p><img alt="..." src="` + analUrl + `" width=1" height="1"/></p>`;
    let sigHtml = `<style>
img {
  display: inline-block;
}
</style>
<br> 
<br> 
    <a href="` + process.env.DOWNLOAD_URL_1 + `">Click here to download ` + process.env.APP_1 + `</a> 
<br>  
<a href="` + process.env.DOWNLOAD_URL_2 + `">Click here to download ` + process.env.APP_2 + `</a>
<br> 
<a href="` + rootLink + `">Click here to learn more about ` + process.env.COMPANY + ` from our website!</a>
<br> 

` + trackingHtml + `
<br><br><p>Thanks,</p>
    <p>The ` + process.env.COMPANY + ` team</p>

        <img alt="` + process.env.COMPANY + `'s Logo" src="` + process.env.COMPANY_LOGO_URL + `"
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
                ef.javascript_abort();
            }
        });
    }
}


function run() {
    prompt.get(['file', 'email', "campaign"], function (err, result) {
        if (err) {
            return onErr(err);
        }
        const camp = result.campaign.replace(" ", "_");
        console.log('Command-line input received:');
        console.log('  file: ' + result.file);
        console.log('  emailField: ' + result.email);
        console.log('  campaign: ' + camp);
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
                let inputData = {
                    subject: result1.subject,
                    message: result2.message,
                    campaign: camp,
                    file: result.file,
                    email: result.email,
                };
                parseEmails(inputData)
            });
        });
    });

}

// console.log("tracker === ", createTracker("charlieporth1@gmail.com"));

run();


function parseEmails(inputData) {
    const subject = inputData.subject;
    const message = inputData.message;
    const campaign = inputData.campaign;
    const file = inputData.file;
    const emailField = inputData.email;

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
            const t = 2750 * ef.getRandomInt(3);
            console.log("waiting ", t);
            ef.wait(t);
            if (count % 10 === 0) {
                const t = 1500 * ef.getRandomInt(10);
                console.log("waiting if ", t);
                ef.wait(t);
            } else if (count % 5 === 0) {
                const t = 1050 * ef.getRandomInt(5);
                console.log("waiting el if ", t);
                ef.wait(t);
            } else {
                const t = 500 * ef.getRandomInt(30);
                console.log("waiting el ", t);
                ef.wait(t);
            }
            console.log("data ", data);
            const e = data[emailField].toString().toLowerCase().trim();
            if (e) {
                count = 0;
                if (count === 0) {
                    count++;
                    emailUserHtml(e, subject.trim(), (message.toString().trim() + "  "), campaign.trim(), data);
                    const t = 100 * ef.getRandomInt(10);
                    console.log("waiting e ", t);
                    ef.wait(t);
                }
            }

        }
    });
    fs.createReadStream(file.trim()).pipe(parser);
}