const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    await interaction.reply("Pong!");
  },
};
