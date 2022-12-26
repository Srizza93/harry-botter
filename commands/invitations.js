const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invitations")
    .setDescription("Automatically invite users to your server"),
  async execute(interaction) {
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
