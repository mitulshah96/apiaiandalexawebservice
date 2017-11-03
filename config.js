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

  "emailURL": "https://prioriti.net/mailms/mail/offset/0/limit/4",

  "newsURL": "http://54.82.196.182:8080/o/webcontent-service/contents/categories/recent",

  "eventURL":"https://prioriti.net/mailms/calendar/events",

}





module.exports = configobject