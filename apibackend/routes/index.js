var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<!DOCTYPE html> \
  <html>\
  \
  <head>\
      <title>Geaux Hack is Awesome!!</title>\
  </head>\
  \
  <body>\
      <div>\
          <h1> Good morning! </h1>\
          <p>Hello World!</p>\
      </div>\
      <div>\
          <p>My name is Michelle!</p>\
          <p>This is <strong>bold</strong></p>\
          <p>This is <em>italics</em></p>\
          <p> if you have a long paragraph and you dont want\
              <br>to make another paragraph tag, you do break\
          </p>\
      </div>\
      <div>\
          <ul>\
              <li>html</li>\
              <li>css</li>\
              <li>javascript</li>\
          </ul>\
          <ol>\
              <li>html</li>\
              <li>css</li>\
              <li>javascript</li>\
          </ol>\
      </div>\
      <div>\
          <img src="apple.png" width="100" />\
          <a href = "saselsu.org">SASE LSU\'s website!</a>\
          <!-- a comment -->\
      </div>\
      <div>\
          <form action="./example.html" method="POST">\
              <input type="text" name="first_text_field">\
              <input type="submit" value="Submit">\
          </form>\
      </div>\
  </body>\
  \
  </html>')
});

router.get('/test', function(req, res) {
    res.send('test');
});

router.get('/redirect', function(req, res) {
    res.redirect('/test');
});

router.post('/submitted', function(req, res) {
    console.log(req.body);
    res.send('POST Submitted text: ' + req.body.first_text_field);
});

router.get('/submitted', function(req, res) {
    res.send('GET Submitted text: ' + req.body.first_text_field);
});

router.post('/query', function(req, res) {
    console.log(req.body);
    res.send('Translated Text: ' + req.body.textToTranslate);
});

module.exports = router;
