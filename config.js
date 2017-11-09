let configobject = {
  config: {
    "version": "1.0",
    "response": {
      "outputSpeech": {
        "ssml": "",
        "type": "SSML"
      },
      "speechletResponse": {
        "outputSpeech": {
          "ssml": ""
        },
        "shouldEndSession": true
      }
    },
    "sessionAttributes": {}
  },
  requestData: {
    "type": "Inbox",
    "fields": ["Subject", "BodyPreview", "From", "ReceivedDateTime"],
    "filters": {
      "field": {
        "key": "isRead",
        "value": "false",
        "criteria": "eq"
      }
    }
  },

  eventrequestData : {
    "limit": 5,
    "filters": {
      "field": {
        "key": "endDateTime",
        "value": "2017-10-25T20:15:00.0000000",
        "criteria": "ge"
      }
    }
  },

  "emailURL": "https://graph.microsoft.com/v1.0/me/mailfolders/inbox/messages?$top=4&",

  "newsURL": "http://54.82.196.182:8080/o/webcontent-service/contents/categories/recent",

  "eventURL":"https://graph.microsoft.com/v1.0/me/calendar/events",

}





module.exports = configobject