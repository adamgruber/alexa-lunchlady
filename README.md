# alexa-lunchlady

Lunch Lady is an Alexa skill that allows you to retrieve the daily school [lunch menu](http://www.cbsd.org/Page/1593) for CBSD elementary schools. It was built using the [alexa-app](https://github.com/matt-kruse/alexa-app) framework and runs as an AWS Lambda function.

## Getting the Menu

In order to get the menu you must invoke the skill with the invocation `lunch lady`. You can request the menu for any date, relative or absolute.

For example, to get the menu for `today`, you can say:
```
Alexa, ask the lunch lady what's for lunch today.
```

#### Intent Schema
```js
{
  "intents": [
    {
      "intent": "GetMenuIntent",
      "slots": [
        {
          "name": "Date",
          "type": "AMAZON.DATE"
        }
      ]
    }
  ]
}
```

#### Sample Utterances

```
GetMenuIntent what is for lunch {Date}
GetMenuIntent what's for lunch {Date}
GetMenuIntent what do they have for lunch {Date}
GetMenuIntent what can I get for lunch {Date}
GetMenuIntent what can I buy for lunch {Date}
GetMenuIntent what can I have for lunch {Date}
GetMenuIntent what is on the menu {Date}
GetMenuIntent what's on the menu {Date}
GetMenuIntent what do they have on the menu {Date}
GetMenuIntent what can I get on the menu {Date}
GetMenuIntent what can I buy on the menu {Date}
GetMenuIntent what can I have on the menu {Date}
GetMenuIntent what is on the lunch menu {Date}
GetMenuIntent what's on the lunch menu {Date}
GetMenuIntent what do they have on the lunch menu {Date}
GetMenuIntent what can I get on the lunch menu {Date}
GetMenuIntent what can I buy on the lunch menu {Date}
GetMenuIntent what can I have on the lunch menu {Date}
GetMenuIntent what is for lunch
GetMenuIntent what's for lunch
GetMenuIntent what do they have for lunch
GetMenuIntent what can I get for lunch
GetMenuIntent what can I buy for lunch
GetMenuIntent what can I have for lunch
GetMenuIntent what is on the menu
GetMenuIntent what's on the menu
GetMenuIntent what do they have on the menu
GetMenuIntent what can I get on the menu
GetMenuIntent what can I buy on the menu
GetMenuIntent what can I have on the menu
GetMenuIntent what is on the lunch menu
GetMenuIntent what's on the lunch menu
GetMenuIntent what do they have on the lunch menu
GetMenuIntent what can I get on the lunch menu
GetMenuIntent what can I buy on the lunch menu
GetMenuIntent what can I have on the lunch menu
GetMenuIntent what are they serving for lunch {Date}
GetMenuIntent what are they making for lunch {Date}
GetMenuIntent what are they having for lunch {Date}
GetMenuIntent what are they serving on the menu {Date}
GetMenuIntent what are they making on the menu {Date}
GetMenuIntent what are they having on the menu {Date}
GetMenuIntent what are they serving on the lunch menu {Date}
GetMenuIntent what are they making on the lunch menu {Date}
GetMenuIntent what are they having on the lunch menu {Date}
GetMenuIntent what are they serving {Date}
GetMenuIntent what are they making {Date}
GetMenuIntent what are they having {Date}
GetMenuIntent what are they serving for lunch
GetMenuIntent what are they making for lunch
GetMenuIntent what are they having for lunch
GetMenuIntent what are they serving on the menu
GetMenuIntent what are they making on the menu
GetMenuIntent what are they having on the menu
GetMenuIntent what are they serving on the lunch menu
GetMenuIntent what are they making on the lunch menu
GetMenuIntent what are they having on the lunch menu
GetMenuIntent what are they serving
GetMenuIntent what are they making
GetMenuIntent what are they having
GetMenuIntent give me the menu for {Date}
GetMenuIntent get the menu for {Date}
GetMenuIntent look up the menu for {Date}
GetMenuIntent tell me the menu for {Date}
GetMenuIntent give me the lunch menu for {Date}
GetMenuIntent get the lunch menu for {Date}
GetMenuIntent look up the lunch menu for {Date}
GetMenuIntent tell me the lunch menu for {Date}
GetMenuIntent give me the menu {Date}
GetMenuIntent get the menu {Date}
GetMenuIntent look up the menu {Date}
GetMenuIntent tell me the menu {Date}
GetMenuIntent give me the lunch menu {Date}
GetMenuIntent get the lunch menu {Date}
GetMenuIntent look up the lunch menu {Date}
GetMenuIntent tell me the lunch menu {Date}
GetMenuIntent lunch for {Date}
GetMenuIntent the menu for {Date}
GetMenuIntent the lunch menu for {Date}
GetMenuIntent lunch {Date}
GetMenuIntent the menu {Date}
GetMenuIntent the lunch menu {Date}
GetMenuIntent {Date} menu
GetMenuIntent {Date} lunch
GetMenuIntent {Date} lunch menu
```
