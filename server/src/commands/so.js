module.exports = {
  name: "shoutout",
  aliases: ["so"],
  permissions: ["broadcaster", "moderator", "vip"],
  run: async (client, channel, userstate, context, message) => {
    const parse = message.slice(1).split(" ");
    const streamerName = parse.splice(1);
    client.say(
      channel,
      `Hey everyone, go check out ${streamerName[0]} at https://www.twitch.tv/${streamerName[0]} and show them some love!`
    );
  },
};
