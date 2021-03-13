const firebase = require("../utils/firebase");

module.exports = {
  name: "resetfill",
  aliases: [],
  permissions: ["broadcaster", "moderator"],
  run: async () => await firebase.resetFillWaterState(),
};
