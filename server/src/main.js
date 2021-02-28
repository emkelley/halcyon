require("dotenv").config();

// *
// * Twitch Bot
// *

const tmi = require("tmi.js");
const onChatEvent = require("./events/onChatEvent");
const Config = require("./config.json");

client = new tmi.Client(Config.tmiOptions);

client.connect();

client.on(
  "message",
  async (channel, userstate, message, self) =>
    await onChatEvent(client, channel, userstate, message, self)
);

// *
// * Express Server
// *

const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 9090;
// const onHTTPEvent = require("./events/onHTTPEvent");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(
    "\u001b[96;2m➯",
    `Halcyon web server listening on http://localhost:${port}`,
    "\u001b[0m"
  );
});

app.get("/", function (req, res) {
  console.log("GET request");
  res.sendFile(path.join(__dirname + "/index.html"));
});

// app.post("/general", function (req, res) {
//   const data = request.body;
//   onHTTPEvent(client, "#0neguy", data);
//   res.sendFile(path.join(__dirname + "/index.html"));
// });
