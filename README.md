# newman-reporter-slacknotification

Custom [Newman](https://github.com/postmanlabs/newman) reporter to send message to [Slack](https://slack.com/)

<img src="https://github.com/thinhdnn/newman-reporter-slacknotification/blob/master/testResults.png?raw=true" width="450"  height="550">

## Before you get started
- Install [Newman](https://github.com/postmanlabs/newman) ``` $ npm run i -g newman ```
- Create a [Slack incoming webhook url](https://api.slack.com/messaging/webhooks)
or
- Create a [Slack bot to send to channel or user dynamically](https://api.slack.com/messaging/sending)

## Installation
 ```CLI
 npm i -g newman-reporter-slacknotification
 ```

## Usage
```CLI
 newman run <collectionFile> -e <environmentFile> --suppress-exit-code -r slacknotification --reporter-slacknotification-webhookurl '<webhookurl>'
```

## Usage with channel override bot
```CLI
 newman run <collectionFile> -e <environmentFile> --suppress-exit-code -r slacknotification --reporter-slacknotification-webhookurl '<https://slack.com/api/chat.postMessage>' --reporter-slacknotification-token '<bearer token>' --reporter-slacknotification-channel '<channel or userid>'
```

## Reporter Options Optionals
```
 --reporter-slacknotification-messageSize '<messageSize>' e.g 150
 --reporter-slacknotification-token '<bearer token>' e.g xoxb-XXXXXXXXXXXX-TTTTTTTTTTTTTT
 --reporter-slacknotification-channel '<channel>' e.g #general
 --reporter-slacknotification-failuresChannel '<channel>' e.g. #alerts
 --reporter-slacknotification-collection '<collectionName> e.g test.json
 --reporter-slacknotification-environment '<environmentName> e.g env.json
 --reporter-slacknotification-reportingurl '<URL> e.g https://127.0.1/index.html
 --reporter-slacknotification-limitFailures '<limitFailures>; e.g 5
 --reporter-slacknotification-authorName '<authorName>; e.g "Newman Test"

```


## Reporter Options
**webhookurl** 
Webhook URL to point to the slack api where results are published

**collection** 
Option to add the name of collection file onto the message

**environment**
Option to add the name of environment file onto the message

**messageSize**
Option to change the message size, defaulted to 100

**token**
Option to use bearer token for slack bots for channel override

**channel**
Option to select channel or user receive the result

**onlyFailure**
Option to send failure report only. Default: false

**overFailures**
Option to send failure report if number of failures over. Default: 0
To use the option, you need set onlyFailure = true

**limitFailures**
Option to limit the amount failures shown in slack

**authorName**
Option to define a custom author name for Slack's message. If not provided, “Newman Test” will be used.
