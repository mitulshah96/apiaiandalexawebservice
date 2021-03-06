const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const request = require('request');
const configobject = require('./config')
const moment = require('moment');
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 4200))


app.get('/', function (req, res) {
  res.send('Use the /webhook endpoint.')
})
app.get('/webhook', function (req, res) {
  res.send('You must POST your request')
})

app.post('/webhook', function (req, res) {
  // console.log("Hello")
  var accesstoken = '';
  var response = configobject.config;
  if (req.headers['x-forwarded-proto'] != 'apiai') {
    console.log(req.body.session.user.accessToken)
    if (!!req.body.session.user.accessToken) {
      //console.log('Amazon');
      res.setHeader('Content-Type', 'application/json');
      // console.log(req.body);

      processRequest();

      function getActionName() {
        //console.log(req.body)
        accesstoken = req.body.session.user.accessToken;
        console.log(req.body.request.intent);
        return req.body.request.intent.name;
      }

      // function getResponse() {
      //   return configobject.config;
      // }


      function processRequest() {
        let actionName = getActionName();
        // //console.log(actionName)
        // var response = getResponse();
        // res.send(response);


        if (actionName === 'Email_widget_intent') {
          console.log(actionName);
          var emailsArray = [];
          let emailURL = configobject.emailURL;
          // let requestData = configobject.requestData;

          request({
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer' + accesstoken
            },
            url: emailURL,
            method: "GET"
            // body:    "mailServer=Microsoft;"
          }, function (error, resp, body) {
            let dataArray = JSON.parse(body);
            dataArray = dataArray.value
            for (let i in dataArray) {
              emailsArray += dataArray[i].subject + ". Email sent from " + dataArray[i].from.emailAddress.name + " . Preview of mail is " + dataArray[i].bodyPreview
            }

            if (emailsArray.length > 0) {
              console.log(emailsArray);
              response.response.outputSpeech.ssml = '<speak> <prosody rate="88%" volume="-10dB" pitch="-20%">  This is what show up in  Your mail ' + emailsArray + ' </prosody> </speak>'
              response.response.speechletResponse.outputSpeech.ssml = '<speak> <prosody rate="88%" volume="-10dB" pitch="-20%"> This is what show up in your mail' + emailsArray + ' </prosody> </speak>'
              res.send(response);
            } else {
              response.response.outputSpeech.ssml = "<speak> No Unread emails are available .</speak>"
              response.response.speechletResponse.outputSpeech.ssml = "<speak> No Unread emails are available .</speak>"
              res.send(response);
            }
          });
        }


        else if (actionName === 'calendar_events') {
          console.log(actionName)
          var eventsArray = [];
          let eventURL = configobject.eventURL;
          // let eventrequestData = configobject.eventrequestData;

          request({
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer' + accesstoken
            },
            url: eventURL,
            method: "GET",
            // json: eventrequestData
          }, function (error, resp, body) {
            let dataArray = JSON.parse(body);
            dataArray = dataArray.value
            for (let i in dataArray) {
              eventsArray += "Event is on " + dataArray[i].subject + "  and is scheduled on " + moment(dataArray[i].start.dateTime).format("YYYY-MM-DD") + " . which is organized by  " +
                dataArray[i].organizer.emailAddress.name + " . and ends on " + moment(dataArray[i].end.dateTime).format("YYYY-MM-DD") + ". "
            }
            //  console.log(eventsArray);
            if (eventsArray.length > 0) {
              console.log(eventsArray)
              response.response.outputSpeech.ssml = '<speak> <prosody rate="88%" volume="-10dB" pitch="-20%"> Your events are ' + eventsArray + ' </prosody> </speak>'
              response.response.speechletResponse.outputSpeech.ssml = '<speak> <prosody rate="88%" volume="-10dB" pitch="-20%"> Your events are' + eventsArray + ' </prosody> </speak>'
              res.send(response);
            } else {
              response.response.outputSpeech.ssml = '<speak> No Events is scheduled .</speak>'
              response.response.speechletResponse.outputSpeech.ssml = '<speak> No Events is scheduled .</speak>'
              res.send(response);
            }
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
              if (Object.getOwnPropertyNames(dataArray[i].content).length !== 0) {
                newsdata += '<p>' + dataArray[i].content.summary + '</p> <break time="500ms"/> ';
              }
            }

            response.response.outputSpeech.ssml = '<speak> <prosody rate="88%" volume="-10dB" pitch="-20%"> This is what trending in news from my source ' + newsdata + ' . Thats all from my source news. Thank You.</prosody> </speak>'
            response.response.speechletResponse.outputSpeech.ssml = '<speak> This is what trending in news from my source' + newsdata + ' . That\'s all from my source news. Thank You</speak>'
            console.log(newsdata);
            res.send(response);
            //console.log(newsdata);
          });
        }

        //jtnEWK03&pguqJGMX553:-]



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
          response.response.outputSpeech.ssml = "<speak> Something went wrong can u say it again </speak>"
          response.response.speechletResponse.outputSpeech.ssml = "<speak> Something went wrong can u say it again </speak>"
          res.send(response)
        }

      }
    }
    else {
      response.response.outputSpeech.ssml = '<speak> <prosody rate="88%" volume="-10dB" pitch="-20%"> Sorry, your my source account is not linked. Please go to alexa app to link it. </prosody> </speak>'
      response.response.speechletResponse.outputSpeech.ssml = '<speak> <prosody rate="88%" volume="-10dB" pitch="-20%"> Sorry, your my source account is not linked. Please go to alexa app to link it. </prosody> </speak>'
      res.send(response)
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
