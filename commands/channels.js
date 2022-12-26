const { SlashCommandBuilder } = require("discord.js");
const { adminId } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("channels")
    .setDescription("Create a text and a voice channel")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Set the category name")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (interaction.user.id === adminId) {
      const categoryName = interaction.options.getString("input");
      await interaction.deferReply({ ephemeral: true });
      const createCategory = await interaction.guild.channels.create({
        name: categoryName,
        type: 4,
        reason: "New Class",
      });

      Promise.all([
        await interaction.guild.roles.create({
          name: `${categoryName}-role`,
          color: "Random",
        }),
        await interaction.guild.channels.create({
          name: `${categoryName}-text`,
          type: 0,
          parent: createCategory.id,
        }),
        await interaction.guild.channels.create({
          name: `${categoryName}-voice`,
          type: 2,
          parent: createCategory.id,
        }),
      ]);
      return false;
    }
  },
};
