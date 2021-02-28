const { prefix } = require("../config.json");
const { CommandFactory } = require("../store/CommandFactory");

const commands = new CommandFactory(process.cwd() + "/src/commands/");

const isUserPermitted = require("../utils/perms");

module.exports = async (client, ...eventParams) => {
  let [channel, userstate, message, self] = eventParams;

  if (self) return;
  if (!message.startsWith(prefix)) return;

  const context = message.slice(prefix.length).split(/ +/);
  const commandName = context.shift().toLowerCase();
  const command = commands.getCommand(commandName);

  if (command !== null) {
    if (isUserPermitted(userstate["badges"], command.permissions))
      await command.run(client, channel, userstate, context);
    else {
      const msg = `@${userstate["display-name"]} - You don't have permission to use that command!`;
      await client.say(channel, msg);
    }
  } else return;
};
