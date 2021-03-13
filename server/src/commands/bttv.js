module.exports = {
  name: "bttv",
  aliases: ["emotes"],
  run: async (client, channel, userstate, context, message) => {
    client.say(
      channel,
      `Are you seeing words in chat such as catJAM and FeelsBadMan and don't know what they are? You might be missing a Twitch extension called Better Twitch TV. BTTV adds tons of new emotes and gifs to use in chat without needing to be subscribed. Check it out here nightdev.com/betterttv/`
    );
  },
};
