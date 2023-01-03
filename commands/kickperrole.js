const { SlashCommandBuilder } = require("discord.js");
const { adminId } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kickperrole")
    .setDescription("Kick out all members of the role chosen")
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
        ).id;

        interaction.guild.members.cache.forEach((member) => {
          if (
            member._roles.includes(role) &&
            member.user.id !== adminId &&
            member.user.username !== "Harry Botter"
          ) {
            member.kick();
          }
        });
      } catch (error) {
        console.log("Something went wrong " + error);
      }
      await interaction.reply({
        content: "All users have been kicked out",
        ephemeral: true,
      });
      return;
    }
    await interaction.reply("Only Admin can use this command");
  },
};
