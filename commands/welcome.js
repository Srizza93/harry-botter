const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  InteractionCollector,
  Client,
  GatewayIntentBits,
  ComponentType,
} = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});
const { adminId } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("welcome")
    .setDescription(
      "Create a private welcome channel for users with role 'discorder' to select their role"
    ),
  async execute(interaction) {
    if (interaction.user.id === adminId) {
      if (!interaction.isChatInputCommand()) return;
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
          const welcome = await interaction.guild.channels
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

          this.createWebhook(interaction, welcome);
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
    } else if (interaction.isButton()) {
      const message = new InteractionCollector(client);
      await interaction.reply("Button clicked " + message);
    }
    await interaction.reply("Only Admin can use this command");
  },
  async createWebhook(interaction, welcome) {
    const embed = new EmbedBuilder().setTitle("Some Title").setColor(0x00ffff);
    const excludedRoles = ["discorder", "simoneBot", "@everyone"];
    const enumKeys = ["Primary", "Secondary", "Success", "Danger", "Link"];
    let index = -1;

    const rolesButtons = interaction.guild.roles.cache
      .filter((role) => !excludedRoles.includes(role.name))
      .map((role) => {
        index++;
        return new ButtonBuilder()
          .setCustomId(role.name)
          .setLabel(role.name)
          .setStyle(ButtonStyle[enumKeys[index]]);
      });
    await interaction.guild.channels
      .create({
        name: "welcome-text",
        type: 0,
        parent: welcome.id,
      })
      .then((channel) => {
        channel
          .createWebhook({
            name: "Pick a role",
            embeds: [embed],
          })
          .then((webhook) => {
            const row = new ActionRowBuilder().addComponents(rolesButtons);
            webhook
              .send({
                content: "Select the appropriate role",
                components: [row],
              })
              .then((message) => {
                const collector =
                  message.channel.createMessageComponentCollector({
                    componentType: ComponentType.Button,
                  });

                collector.on("collect", async (i) => {
                  try {
                    const discordRole = i.member.guild.roles.cache.find(
                      (role) => role.name === "discorder"
                    );
                    const newRole = i.member.guild.roles.cache.find(
                      (role) => role.name === i.customId
                    );
                    i.member.roles.add(newRole);
                    i.member.roles.remove(discordRole);
                    Promise.all([
                      await i.reply({
                        content: "You have chosen the role of " + i.customId,
                        ephemeral: true,
                      }),
                      await interaction.followUp({
                        content:
                          i.member.user.username +
                          " has chosen the role of " +
                          i.customId,
                        ephemeral: true,
                      }),
                    ]);
                  } catch (error) {
                    console.log("Error while adding new role to user " + error);
                    await interaction.followUp(
                      "Something went wrong, please contact your admin"
                    );
                  }
                });
              });
          })
          .catch(console.error);
      })
      .catch(console.error);
  },
};
