const { SlashCommandBuilder } = require("discord.js");
const { adminId } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("List all members with the selected role")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Write the desired role")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.id === adminId) {
      try {
        const inputRole = interaction.options.getString("input");

        await interaction.guild.members.fetch(); //cache all members in the server

        const role = interaction.guild.roles.cache.find(
          (role) => role.name === inputRole
        );

        if (role) {
          const members = role.members.map((member) => member.id).join(", ");
          if (members) {
            interaction.reply({
              content: `Members: ${members}`,
              ephemeral: true,
            });
            return;
          }
        }
        interaction.reply({
          content: `No members available with role ${inputRole}`,
          ephemeral: true,
        });
      } catch (error) {
        console.log(error);
      }
      return;
    }
    await interaction.reply("Only Admin can use this command");
  },
};
