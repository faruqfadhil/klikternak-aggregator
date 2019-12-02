/**
 * Author : Faruq
 */
var mqtt = require('mqtt');
const cron = require("node-cron");

// comment this when no mongo DB installed on your server
// connect to mongo DB 
// mongoose.connect(config.database)

var topic = "product/klikternak"
var client = mqtt.connect("mqtt://52.175.50.19", {
    username: "klikternak_broker",
    password: "yesiknow"
});
console.log("connected flag  " + client.connected);

//handle incoming messages
client.on('message', function (topic, message, packet) {
    console.log("message is " + message);
    console.log("topic is " + topic);
});


client.on("connect", function () {
    console.log("connected  " + client.connected);
    client.subscribe(topic);
    cron.schedule("*/30 * * * * *", function () {
      console.log("publishing..");
      useMqtt();
    });
})

//handle errors
client.on("error", function (error) {
    console.log("Can't connect" + error);
    process.exit(1)
});

const useMqtt = function (req, res) {
  var uuid1 = "830b9e6c-b3f9-4612-ba88-d43f9085898a"
  var suhu = Math.random() * (40 - 35) + 35
  var jantung = Math.random() * (80 - 48) + 48
  client.publish(topic, JSON.stringify({ _id: uuid1, tanggal: new Date(Date.now()), suhu: suhu.toFixed(2), jantung: jantung.toFixed(2), kondisi: 1 }))
}