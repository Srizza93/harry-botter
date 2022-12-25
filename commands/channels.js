const { SlashCommandBuilder } = require("discord.js");
const { adminId } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("channels")
    .setDescription("Create a text and a voice channel"),
  async execute(interaction) {
    if (interaction.user.id === adminId) {
      Promise.all([
        await interaction.guild.channels
          .create({
            name: "Text-category",
            type: 4,
            reason: "New Class",
            // your permission overwrites or other options here
          })
          .then((category) => {
            return interaction.guild.channels.create({
              name: "Text-channel",
              type: 0,
              parent: category.id,
              // your permission overwrites or other options here
            });
          }),
        await interaction.guild.channels
          .create({
            name: "Voice-category",
            type: 4,
            reason: "New Class",
            // your permission overwrites or other options here
          })
          .then((category) => {
            return interaction.guild.channels.create({
              name: "Voice-channel",
              type: 2,
              parent: category.id,
              // your permission overwrites or other options here
            });
          }),
      ]);
    }
  },
};
