const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const request = require('request');
const configobject = require('./config')
const emailURL = require('./config')

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
    //console.log('Amazon');
    res.setHeader('Content-Type', 'application/json');
    // console.log(req.body);

    processRequest();

    function getActionName() {
      //console.log(req.body)
      return req.body.request.intent.name;
    }
    function getResponse() {
      return configobject.config;
    }
    function processRequest() {
      let actionName = getActionName();
      // //console.log(actionName)
      var response = getResponse();
      // res.send(response);


      if (actionName === 'Email_widget_intent') {
        console.log(actionName)
        var emailsArray = [];
        let emailURL = configobject.emailURL
        let requestData = configobject.requestData

        request({
          headers: { 'X-Mail-Id': 'Ma510db45-fcf5-cd45-001f-5c09e39a288d' },
          url: emailURL,
          method: "POST",
          json: requestData
          // body:    "mailServer=Microsoft;"
        }, function (error, resp, body) {
          let dataArray = body.result;
          for (let i in dataArray) {
            emailsArray += dataArray[i].subject + ". email sent from " + dataArray[i].from.emailAddress.name + " . Preview of mail is " + dataArray[i].bodyPreview
          }
          //console.log(emailsArray);
          response.response.outputSpeech.ssml = "<speak> This is what show up in  Your mail " + emailsArray + "</speak>"
          response.response.speechletResponse.outputSpeech.ssml = "<speak> This is what show up in your mail" + emailsArray + "</speak>"
          res.send(response);
        });
      }



      else if (actionName === 'Recent_news') {
        console.log(actionName)
        var newsArray = [];
        let newsdata = ""
        let newsURL = configobject.newsURL

        request(newsURL, function (error, resp, body) {
          let jsonData = JSON.parse(body);
          //   console.log('body:', jsonData.data.length); // Print the HTML for the Google homepage.
          let dataArray = jsonData.data;


          for (let i in dataArray) {
            newsdata += dataArray[i].content.summary + " ";
            //newsArray.push(newsdata);
          }
          console.log(newsdata);
          response.response.outputSpeech.ssml = "<speak> This is what trending in news" + newsdata + "</speak>"
          response.response.speechletResponse.outputSpeech.ssml = "<speak> This is what trending in news" + newsdata + "</speak>"
          res.send(response);
          //console.log(newsdata);
        });
      }





      else if (actionName === 'DefaultWelcomeIntent') {
        console.log(actionName)
        response.response.outputSpeech.ssml = "<speak> Hello I am Alexa .Happy to serve you  in Amwater. To know more ask me about Amwater </speak>"
        response.response.speechletResponse.outputSpeech.ssml = "<speak> Hello I am Alexa .Happy to serve you  in Amwater. To know more ask me about Amwater </speak>"
        res.send(response)
      }
      else if (actionName === 'AboutAmwater') {
        console.log(actionName)
        response.response.outputSpeech.ssml = '<speak> American Water is an American public utility company operating in the United States and Canada.</speak>'
        response.response.speechletResponse.outputSpeech.ssml = '<speak> American Water is an American public utility company operating in the United States and Canada.</speak>'
        res.send(response)
      }
      else if (actionName === 'AboutAmwaterCeo') {
        console.log(actionName);
        response.response.outputSpeech.ssml = "<speak> Susan N. Story (born 1960) is an American utility executive and the current Chief Executive Officer of American Water.</speak>"
        response.response.speechletResponse.outputSpeech.ssml = "<speak>Susan N. Story (born 1960) is an American utility executive and the current Chief Executive Officer of American Water. </speak>"
        res.send(response)
      }
      else if (actionName === 'AboutAmwaterEmployeeCount') {
        console.log(actionName);
        response.response.outputSpeech.ssml = '<speak> Number of employees: 6800 in 2016  </speak>'
        response.response.speechletResponse.outputSpeech.ssml = '<speak> Number of employees: 6800 in 2016  </speak>'
        res.send(response)
      }
      else if (actionName === 'Employee_onboarding') {
        console.log(actionName);
        response.response.outputSpeech.ssml = '<speak> Good Afternoon, Mitul and Welcome to MySource! Since this is the first time you are here, let me show you around. ask me about start a tour i will let u brief about that</speak>'
        response.response.speechletResponse.outputSpeech.ssml = '<speak> Good Afternoon, Mitul and Welcome to MySource! Since this is the first time you are here, let me show you around. ask me about start a tour i will let u brief about that</speak>'
        res.send(response)
      }
      else if (actionName === 'Employee_onboardingYes') {
        console.log(actionName);
        response.response.outputSpeech.ssml = "<speak> American Water is an American public utility company operating in the United States and Canada. It was founded in 1886 as the American Water Works and Guarantee Company to know more ask me about Company's CEO or Training resource or Company Policies </speak>"
        response.response.speechletResponse.outputSpeech.ssml = "<speak> American Water is an American public utility company operating in the United States and Canada. It was founded in 1886 as the American Water Works and Guarantee Company to know more ask me about Company's CEO or Training resource or Company Policies </speak>"
        res.send(response)
      }
      else if (actionName === 'TrainingResources') {
        console.log(actionName);
        response.response.outputSpeech.ssml = "<speak> No Training will be provided on Job </speak>"
        response.response.speechletResponse.outputSpeech.ssml = "<speak> No Training will be provided on Job </speak>"
        res.send(response)
      }
      else if (actionName === 'CompanyPoliciesSummary') {
        console.log(actionName);
        response.response.outputSpeech.ssml = "<speak> Amwater believes in CLEAR DESK POLICY and  CLEAR SCREEN POLICY </speak>"
        response.response.speechletResponse.outputSpeech.ssml = "<speak> Amwater believes in CLEAR DESK POLICY and  CLEAR SCREEN POLICY </speak>"
        res.send(response)
      }
      else if (actionName === 'Employee_onboardingNo') {
        console.log(actionName);
        response.response.outputSpeech.ssml = "<speak> I can help you get started with mySource by creating your personal profile. This will help everyone else know you and learn about you.ask me for detail Profile or quick profile </speak>"
        response.response.speechletResponse.outputSpeech.ssml = '<speak> I can help you get started with mySource by creating your personal profile. This will help everyone else know you and learn about you.ask me for detail Profile or quick profile </speak>'
        res.send(response)
      }
      else if (actionName === 'DetailedProfile') {
        console.log(actionName);
        response.response.outputSpeech.ssml = "<speak> Detailed profile details.to know more ask me about my benifits or Leave Tracker or Timesheet</speak>"
        response.response.speechletResponse.outputSpeech.ssml = "<speak> Detailed profile details.to know more ask me about my benifits or Leave Tracker or Timesheet</speak>"
        res.send(response)
      }
      else if (actionName === 'Benefits') {
        console.log(actionName);
        response.response.outputSpeech.ssml = "<speak> Life Time GYM Membership</speak>"
        response.response.speechletResponse.outputSpeech.ssml = "<speak> Life Time GYM Membership</speak>"
        res.send(response)
      }
      else if (actionName === 'LeaveTracker') {
        console.log(actionName);
        response.response.outputSpeech.ssml = "<speak> You have 20 holidays left </speak>"
        response.response.speechletResponse.outputSpeech.ssml = "<speak> You have 20 holidays left </speak>"
        res.send(response)
      }
      else if (actionName === 'TimeSheet') {
        console.log(actionName);
        response.response.outputSpeech.ssml = "<speak> Yipee No work today </speak>"
        response.response.speechletResponse.outputSpeech.ssml = "<speak> Yipee No work today </speak>"
        res.send(response)
      }

      else if (actionName === 'QuickProfile') {
        console.log(actionName);
        response.response.outputSpeech.ssml = "<speak> Okay, let me help you create a quick profile. If you choose some of these personal interests, I can connect you to other employees with similar interests. </speak>"
        response.response.speechletResponse.outputSpeech.ssml = "<speak> Okay, let me help you create a quick profile. If you choose some of these personal interests, I can connect you to other employees with similar interests. </speak>"
        res.send(response)
      }

      else {
        response.response.outputSpeech.ssml = "<speak> Something went wrong can u repeat it again </speak>"
        response.response.speechletResponse.outputSpeech.ssml = "<speak> Something went wrong can u repeat it again </speak>"
        res.send(response)
      }

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
