# Corona-Watcher

This is a simple application, which uses the API of https://thevirustracker.com/ to keep track of the Co-vid cases in Luxembourg. If any change has been detected it sends out a Pushover.net notification to my phone.

## Configuration

Copy `config/config.sample.js` to `config/config.js` and change the default values.

value: `type`| infomation
---|----
developmentMode: `boolean` | controls the priority of the Pushover Message (if **true** ? -1 : 2)
pushoverToken.application: `string` | the Pushover.net application token
pushoverToken.user: `string` | the Pushover.net user token
APIrequestInterval: `number` | the timeout between API calls

## Installation

Clone this repository, install the dependencies and run the app.

```sh
$ cd corona-watcher
$ npm install
$ npm run start
```
