const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invitations")
    .setDescription("Generate an invitation link"),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    await interaction.channel
      .createInvite()
      .then((invite) =>
        interaction.reply(
          `Share the following link https://discord.gg/${invite.code}`
        )
      )
      .catch(console.error);
  },
};
