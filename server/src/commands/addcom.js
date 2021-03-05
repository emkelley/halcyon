const axios = require("axios");
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

module.exports = {
  name: "addcom",
  aliases: ["addcommand"],
  permissions: ["broadcaster", "moderator"],
  run: async (client, channel, userstate, context, message) => {
    const messageArray = message.split(" "); // create an array from the message string
    messageArray.shift(); // remove the !addcom command from message

    const [newCommand, newCommandMessage] = messageArray;
    if (!newCommand) return client.say(channel, "No new command sent");
    if (!newCommandMessage) return client.say(channel, "No command value sent");

    getCurrentDBCommands(client, channel, {
      addedBy: userstate.username,
      command: newCommand,
      response: newCommandMessage,
    });
  },
};

const getCurrentDBCommands = async (
  client,
  channel,
  { addedBy, command, response }
) => {
  const endpoint = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/commands`;
  const headers = { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` };
  await axios.get(endpoint, { headers }).then(({ data: { records } }) => {
    const existingCommands = [];
    records.forEach((record) => existingCommands.push(record.fields.command));
    setCommandInDB(
      client,
      channel,
      {
        addedBy,
        command,
        response,
      },
      existingCommands
    );
  });
};

const setCommandInDB = async (
  client,
  channel,
  { addedBy, command, response },
  existingCommands
) => {
  if (existingCommands.includes(command))
    return client.say(
      channel,
      "Command already exists, try naming it something else"
    );

  await base("commands").create(
    [
      {
        fields: {
          addedBy,
          command,
          response,
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        client.say(channel, `Command !${command} has been added to halcyon`);
        console.log(record.getId());
      });
    }
  );
};
