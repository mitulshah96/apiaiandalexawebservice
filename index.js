const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var Alexa = require("alexa-sdk");
var emails = [
  {
    "from": "jane@accionlabs.com",
    "subject": "meeting at 5:30 PM",
    "message": "Hi Mitul, Please be present for the meeting on time!",
    "isRead": false
  }, {
    "from": "hemesh@accionlabs.com",
    "subject": "Discussion for Architecture",
    "message": "Dear Mitul, Let's meet at 7:30 PM for discussing the architecture of amwater my source.",
    "isRead": false
  }, {
    "from": "ash@accionlabs.com",
    "subject": "Fun at work",
    "message": "Hi All, Be present at cafeteria at 4:30 PM for fun activities and snacks on the house.",
    "isRead": false
  }
]
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 4200))


app.get('/', function (req, res) {
  res.send('Use the /webhook endpoint.')
})
app.get('/webhook', function (req, res) {
  res.send('You must POST your request')
})

app.post('/webhook', function (req, res) {
  if (req.headers['x-forwarded-proto'] != 'apiai') {
    console.log('Amazon');
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body);

    processRequest();

    function getActionName() {
      return req.body.request.intent.name;
    }
    function processRequest() {
      let actionName = getActionName();
      //console.log(actionName)
      var webhookReply = 'Hello Mitul! Welcome from the readEmail.'
      res.status(200).json({
        "version": "1.0",
        "response": {
          "outputSpeech": {
            "ssml": "<speak> Reading 3 new emailsEmail number 1 from jane@accionlabs.com with subject meeting at 5:30 PMMessage is : Hi Mitul, Please be present for the meeting on time!Email number 2 from hemesh@accionlabs.com with subject Discussion for ArchitectureMessage is : Dear Mitul, Let's meet at 7:30 PM for discussing the architecture of amwater my source.Email number 3 from ash@accionlabs.com with subject Fun at workMessage is : Hi All, Be present at cafeteria at 4:30 PM for fun activities and snacks on the house. </speak>",
            "type": "SSML"
          },
          "speechletResponse": {
            "outputSpeech": {
              "ssml": "<speak> Reading 3 new emailsEmail number 1 from jane@accionlabs.com with subject meeting at 5:30 PMMessage is : Hi Mitul, Please be present for the meeting on time!Email number 2 from hemesh@accionlabs.com with subject Discussion for ArchitectureMessage is : Dear Mitul, Let's meet at 7:30 PM for discussing the architecture of amwater my source.Email number 3 from ash@accionlabs.com with subject Fun at workMessage is : Hi All, Be present at cafeteria at 4:30 PM for fun activities and snacks on the house. </speak>"
            },
            "shouldEndSession": true
          }
        },
        "sessionAttributes": {}
      })

    }
  }
  else {
    console.log('APIAI')
    res.setHeader('Content-Type', 'application/json');
    let response_object = {};
    let bodyResult = req.body.result
    let bodyParameters = bodyResult.parameters;

    processRequest();


    function getActionName() {
      return req.body.result.action;
    }

    function processRequest() {
      let actionName = getActionName();
      console.log(req.body)
      var webhookReply = 'Hello Mitul! Welcome from the webhook.'


      res.status(200).json({
        source: 'webhook',
        speech: webhookReply,
        displayText: webhookReply
      })
    }
  }

})

app.listen(app.get('port'), function () {
  console.log('* Webhook service is listening on port:' + app.get('port'))
})
