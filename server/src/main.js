require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const qs = require("querystring");
const helmet = require("helmet");
const axios = require("axios");
const chalk = require("chalk");
const tmi = require("tmi.js");
const path = require("path");
const app = express();
const port = process.env.PORT || 9090;
const HalcyonConfig = require("./config.json");
const onChatEvent = require("./utils/chatHandler");
const { CommandFactory } = require("./utils/commandFactory");
const commands = new CommandFactory(process.cwd() + "/src/commands/");
const Discord = require("discord.js");
const discordClient = new Discord.Client();

// *
// * Discord discord.js Bot
// *

discordClient.on("ready", () => {
  console.log(
    chalk
      .hex("#7289DA")
      .bold(`${discordClient.user.tag} has connected to Discord`)
  );
});

discordClient.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

discordClient.login(process.env.DISCORD_BOT_TOKEN);

// *
// * Twitch TMI.js Bot
// *

client = new tmi.Client(HalcyonConfig.tmiOptions);

client.connect();

client.on("connected", () =>
  console.log(chalk.hex("#ba43ff").bold(`robo0NEGUY has connected to Twitch`))
);

client.on(
  "message",
  async (channel, userstate, message, self) =>
    await onChatEvent(client, channel, userstate, message, self)
);
// client.on(
//   "message", (channel, userstate, message, self) => {
//     if (message.includes('The shuffled word is')) {

//     }
//   }
// );
client.on("subscription", function (channel, username, methods) {
  client.say(channel, username + " Has subscribed PogChamp ");
});

client.on(
  "resub",
  function (channel, username, months, message, userstate, methods) {
    client.say(
      channel,
      username + " Has subscribed for " + months + " months in a row PogChamp "
    );
  }
);

// *
// * Express Server
// *
let whitespaceemote = `
⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ SexyOfficer ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀
`;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.options("*", cors());

app.listen(port, () => {
  console.log(
    chalk
      .hex("#83C040")
      .bold(`Halcyon node server listening on http://localhost:${port}`)
  );
});

app.get("/", function (req, res) {
  console.log("GET request");
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/commands", function (req, res) {
  res.send(commands._commands);
});

app.get("/streaminfo/:id", async function (req, res) {
  const id = req.params.id;
  const opts = {
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    grant_type: "client_credentials",
    scopes: "",
  };

  const tokenParams = qs.stringify(opts);

  const { data } = await axios.post(
    `https://id.twitch.tv/oauth2/token?${tokenParams}`
  );

  const {
    data: { data: streams },
  } = await axios.get(
    `https://api.twitch.tv/helix/streams?user_id=${id}`, // 129551825 0neguy
    {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  );

  res.send(streams[0] || []);
});

app.post("/message", function (req, res) {
  const { message } = req.body;
  client.say("#0neguy", message);
  res.sendStatus(200);
});

app.post("/command/:id", function (req, res) {
  const usrState = {
    "badge-info": null,
    badges: { broadcaster: "1", "bits-charity": "1" },
    "client-nonce": "077a5523ffb0f74fffd35cc1ac4cf8ce",
    color: "#FFAF8D",
    "display-name": "0NEGUY",
    emotes: null,
    flags: null,
    id: "3e168c22-6983-42f4-8491-3cc472edaf23",
    mod: false,
    "room-id": "129551825",
    subscriber: false,
    "tmi-sent-ts": "1614544018184",
    turbo: false,
    "user-id": "129551825",
    "user-type": null,
    "emotes-raw": null,
    "badge-info-raw": null,
    "badges-raw": "broadcaster/1,bits-charity/1",
    username: "0neguy",
    "message-type": "chat",
  };
  const commandName = req.params.id;
  const command = commands.getCommand(commandName);
  command.run(client, "#0neguy", usrState, commandName);

  res.sendStatus(200);
});
