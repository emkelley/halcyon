const firebase = require("../utils/firebase");

module.exports = {
  name: "water",
  aliases: [],
  run: async (client, channel) => {
    const { counter } = await firebase.getFillWaterState();
    client.say(
      channel,
      `splash86Hydrate @splashley has refilled her water bottle ${counter} time(s) so far this stream splash86Hydrate `
    );
  },
};
