var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/translate/:target', function(req, res, next) {
    console.log("called here")
    if(req.headers.coolapikey == "Geaux-Hack"){
        console.log("called here2")
        next();
    } else {
        console.log("called here3")
        res.send(JSON.stringify({error: "No valid API key!"}))
    }
});

router.get('/test', function(req, res) {
    res.send('test');
});

router.get('/redirecttest', function(req, res) {
    res.send('Cool Redirect');
});

router.get('/redirect', function(req, res) {
    res.redirect('/redirecttest');
});

router.post('/submitted', function(req, res) {
    console.log(req.body);
    res.send('POST Submitted text: ' + req.body.first_text_field);
});

router.get('/submitted', function(req, res) {
    res.send('GET Submitted text: ' + req.query.first_text_field);
});



router.post('/translate/:target', function(req, res) {
    console.log(req.body);
    
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({q: req.body.textToTranslate, source: "en", target: req.params.target, format: "text", api_key: ""})
    };

    console.log(options);
    fetch("https://libretranslate.den.infamousredpanda.com/translate", options).then(apires => apires.json())
        .then(translatedtext => {
            if(translatedtext.error != undefined){
                res.status(400).send(JSON.stringify(translatedtext));
            } else {
                resjson = { translatedText: translatedtext.translatedText };
                console.log(resjson);
                res.send(JSON.stringify(resjson));
            }
        })
        .catch(err => {
            console.log("error");
        })
});

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
