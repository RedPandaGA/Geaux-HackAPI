var express = require('express');
var router = express.Router();

/* This is the initial function that is ran when the server recieves a request containing text to tranlate
It checks whether the request contains a valid API key
If a valid API key exists then progress to the next function (2nd to last one)
Otherwise send back a error stating the request doesn't have a valid api key */
router.post('/translate/:target', function(req, res, next) {
    //console.log("called here")
    if(req.headers.coolapikey == "Geaux-Hack"){
        //console.log("called here2")
        next();
    } else {
        //.log("called here3")
        res.send(JSON.stringify({error: "No valid API key!"}))
    }
});

//This is simple example of a api sending back a response when going to https://api.infamousredpanda.com/test
router.get('/test', function(req, res) {
    res.send('test');
});

//This is the route that is redirected to when a user accesses https://api.infamousredpanda.com/redirect
router.get('/redirecttest', function(req, res) {
    res.send('Cool Redirect');
});

//This is the redirect route which redirects the requestors' browser to https://api.infamousredpanda.com/redirecttest
router.get('/redirect', function(req, res) {
    res.redirect('/redirecttest');
});

//This is a simple example of how to access data sent via a html form GET request and reply by parroting back the submitted text
router.get('/submitted', function(req, res) {
    res.send('GET Submitted text: ' + req.query.first_text_field);
});

//This is a simple example of how to access data sent via a html form POST request and reply by parroting back the submitted text
//Note the difference after req (req.query vs req.body)
router.post('/submitted', function(req, res) {
    res.send('POST Submitted text: ' + req.body.first_text_field);
});


/* This route handles forwarding the end user's translation request to the tranlation application 
It then forwards the translation application's response back to the user's browser.

*/
router.post('/translate/:target', function(req, res) {
    //console.log(req.body);
    //This is where we set different options for the fetch method and package the route's :target parameter and submitted text to tranlate into the relevent json for libretranlate's api.
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({q: req.body.textToTranslate, source: "en", target: req.params.target, format: "text", api_key: ""})
    };

    //console.log(options);
    //This is where the api makes a request to libretranlate's api to process our text into the langugue selected via the :target param
    fetch("https://libretranslate.den.infamousredpanda.com/translate", options).then(apires => apires.json())
        .then(translatedtext => {
            if(translatedtext.error != undefined){
                res.status(400).send(JSON.stringify(translatedtext));
            } else {
                resjson = { translatedText: translatedtext.translatedText };
                //console.log(resjson);
                res.send(JSON.stringify(resjson));
            }
        })
        .catch(err => {
            console.log("error");
        })
});

//This method returns an array of all possible languages/language codes that libretranslate supports
router.get('/possibletranslations', function(req, res) {
    fetch("https://libretranslate.den.infamousredpanda.com/languages").then(apires => apires.json())
        .then(suplang => {
                resjson = suplang[0].targets;
                console.log(resjson);
                res.send(JSON.stringify(resjson));
        })
        .catch(err => {
            console.log("error");
        })
})

module.exports = router;
