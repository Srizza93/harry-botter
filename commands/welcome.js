const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const { adminId } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("welcome")
    .setDescription(
      "Create a private welcome channel for users with role 'discorder' to select their role"
    ),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.user.id === adminId) {
      try {
        let role = interaction.guild.roles.cache.find(
          (role) => role.name === "discorder"
        );
        const welcome = interaction.guild.channels.cache.find(
          (channel) => channel.name === "welcome"
        );

        if (!role) {
          role = await interaction.guild.roles.create({
            name: `discorder`,
            color: "Random",
          });
          await interaction.reply({
            content: "The 'discorder' role has been created",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: "The role 'discorder' already exists",
            ephemeral: true,
          });
        }

        if (!welcome) {
          const channel = await interaction.guild.channels
            .create({
              name: "welcome",
              type: 4,
              reason: "Welcome channel",
              permissionOverwrites: [
                {
                  id: role.id,
                  type: 0,
                  allow: [
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                  ],
                },
              ],
            })
            .then((channel) =>
              channel.permissionOverwrites.create(
                channel.guild.roles.everyone,
                {
                  ViewChannel: false,
                }
              )
            );

          await interaction.guild.channels.create({
            name: "welcome-text",
            type: 0,
            parent: channel.id,
          }),
            await interaction.followUp({
              content: "The 'welcome' channel has been created",
              ephemeral: true,
            });
        } else {
          await interaction.followUp({
            content: "The 'welcome' channel already exists",
            ephemeral: true,
          });
        }
      } catch (error) {
        console.log(error);
      }

      return;
    }
    await interaction.reply("Only Admin can use this command");
  },
};
