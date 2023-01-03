const { SlashCommandBuilder } = require("discord.js");
const { adminId } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kickall")
    .setDescription("Kick out all members except the admin and the bot")
    .addStringOption((option) =>
      option
        .setName("security")
        .setDescription("This will kickout all members except the admin")
        .setRequired(true)
        .addChoices(
          { name: "No", value: "Stop command" },
          { name: "Yes", value: "Kick all" }
        )
    ),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.id === adminId) {
      if (interaction.options.getString("security") === "Stop command") {
        await interaction.reply({
          content: "Command stopped",
          ephemeral: true,
        });
        return;
      }
      try {
        await interaction.guild.members.fetch(); //cache all members in the server

        interaction.guild.members.cache.forEach((member) => {
          if (
            member.user.id !== adminId &&
            member.user.username !== "simoneBot"
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
