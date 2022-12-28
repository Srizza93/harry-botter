const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const { adminId } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trainer")
    .setDescription(
      "Create a private channel for trainers with a text channel, a voice channel"
    ),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.id === adminId) {
      const categoryName = "trainer";
      const categoryExists = interaction.guild.channels.cache.find(
        (category) => category.name === categoryName
      );
      const role = interaction.guild.roles.cache.find(
        (role) => role.name === `${categoryName}-role`
      );
      if (categoryExists) {
        await interaction.reply({
          content: `The category '${categoryName}' already exists`,
          ephemeral: true,
        });
      } else {
        let createCategory = await interaction.guild.channels
          .create({
            name: categoryName,
            type: 4,
            reason: "New Class",
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                type: 1,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: adminId,
                type: 1,
                allow: [
                  PermissionsBitField.Flags.ViewChannel,
                  PermissionsBitField.Flags.ManageChannels,
                ],
              },
            ],
          })
          .then((channel) =>
            channel.permissionOverwrites.create(channel.guild.roles.everyone, {
              ViewChannel: false,
            })
          );

        Promise.all([
          await interaction.guild.roles.create({
            name: `${categoryName}`,
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
          await interaction.reply({
            content: `The category '${categoryName}' has been created, and includes a text and a voice channel. A role with the name '${categoryName}' has been created too`,
            ephemeral: true,
          }),
        ])
          .then((results) => {
            createCategory.permissionOverwrites.create(results[0].id, {
              type: 0,
              ViewChannel: true,
              SendMessages: true,
            });
          })
          .catch((error) =>
            console.log("Error during channel creation " + error)
          );
        if (role) {
          await interaction.followUp({
            content: "Be careful, you have a duplicate role name",
            ephemeral: true,
          });
        }
      }
      return;
    }
    await interaction.reply("Only Admin can use this command");
  },
};
