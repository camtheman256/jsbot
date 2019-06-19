const functions = require('firebase-functions');
const JSHINT = require('jshint').JSHINT;
const js_hint_options = {
    esversion: 6,
    expr: true
};
const request = require('request');
const evaluator = require('safe-eval');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.jsbot = functions.https.onRequest((req, res) => {
    const ENDPOINT = "https://api.groupme.com/v3/bots/post";
    const BOT_ID = "25f88eeec9b131186cae40e51d"; // impersonate my bot. I don't care. Do it. You won't.
    const msg = req.body;
    JSHINT(msg.text, js_hint_options);
    if(JSHINT.errors.length > 0 && msg.sender_type === "user") {
        let out = "";
        out += `${JSHINT.errors.length} Errors: `;
        for(var i = 0; i < JSHINT.errors.length; i++) {
            out += `${JSHINT.errors[i].reason}`;
            if(i !== (JSHINT.errors.length - 1)) {
                out += ", ";
            }
        }
        // console.log(out);
        request.post(ENDPOINT, {json: {text: out, bot_id: BOT_ID}});
    }
    else if(msg.sender_type == "user") {
        // now we have valid JS! Let's do some wack shit with it!
        try {
            const result = evaluator(msg.text, {}, {timeout: 1000});
            // only submit if something comes of it, AKA comments won't be sent
            if(result) {
                // console.log(result.toString());
                request.post(ENDPOINT, {json: {text: result.toString(), bot_id: BOT_ID}});
            }
        }
        catch (e) {
            // means we probably got some multiline JS or something safe-eval doesn't support.
        }
    }
    return res.end();
});
