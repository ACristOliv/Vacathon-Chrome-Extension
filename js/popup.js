// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({status: 0}, function() {
//     console.log('The current status is 0.');
//   });
// });

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})

function updateIcon() {
  chrome.storage.sync.get('status', function(data) {
    var current = data.status;
    chrome.browserAction.setIcon({
      path: {
        "16": "../images/vaca-16x16.png",
        "32": "../images/vaca-32x32.png",
        "48": "../images/vaca-48x48.png",
        "128": "../images/vaca-128x128.png"
      }
    });
    current++;
    if (current == 0)
      current = 1;
    chrome.storage.sync.set({number: current}, function() {
      console.log('The current status is ' + current);
    });
  });
};

chrome.browserAction.onClicked.addListener(updateIcon);
updateIcon();
