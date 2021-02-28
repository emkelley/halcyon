/**
 *
 * Loads commands for the bot from the /commands directory
 * and returns requested commands
 *
 **/

const fs = require("fs");

class CommandFactory {
  constructor(directory) {
    this._directory = directory;
    this._loadAllCommands();
  }
  _loadAllCommands() {
    // todo: add support for nested folders
    this._commands = [];
    const files = fs
      .readdirSync(this._directory)
      .filter((file) => file.endsWith(".js"));
    files.forEach((file) => {
      try {
        const command = require(`${this._directory}${file}`);
        console.info(`Command ${file} has been loaded.`);
        this._commands.push(command);
      } catch (error) {
        console.warn(`Command ${file} could not be loaded. ${error}`);
      }
    });
  }
  getCommand(commandName) {
    let found =
      this._commands.find((cmd) => cmd.name === commandName) ||
      this._commands.find((cmd) => cmd.aliases.includes(commandName));
    if (!found) return null;
    return found;
  }
}

module.exports = {
  CommandFactory,
};
