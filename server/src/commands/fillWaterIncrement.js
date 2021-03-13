const firebase = require("../utils/firebase");

module.exports = {
  name: "fill",
  aliases: [],
  permissions: ["broadcaster", "moderator"],
  run: async (client, channel) => {
    const { counter } = await firebase.getFillWaterState();
    firebase.incrementFillWaterState();
    client.say(
      channel,
      `splash86Hydrate @splashley has refilled her water bottle ${
        counter + 1
      } time(s) so far this stream splash86Hydrate `
    );
  },
};
