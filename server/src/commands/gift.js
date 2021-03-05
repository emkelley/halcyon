module.exports = {
  name: "gift",
  permissions: ["broadcaster", "moderator", "vip"],
  run: async (client, channel, userstate, context, message) => {
    const parse = message.slice(1).split(" ");
    const messageArray = parse.splice(1);
    client.say(channel, `!addpoints ${messageArray[0]} ${messageArray[1]}`);
    client.say(
      channel,
      `${userstate.username} gifted ${messageArray[0]} ${messageArray[1]} points!`
    );
  },
};
