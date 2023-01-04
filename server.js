const express = require("express");
const { token, guildId, adminId } = require("./config.json");
const { REST, Routes } = require("discord.js");
const PORT = 3000;

module.exports = (client) => {
  const app = express();
  app.use(express.json());

  app.get("/:channel", async (req, res) => {
    const rest = new REST({ version: "10" }).setToken(token);
    try {
      const categoryRes = await rest.post(Routes.guildChannels(guildId), {
        body: {
          name: req.params.channel,
          type: 4,
        },
      });

      const channel = client.channels.cache.get(categoryRes.id);

      const channelRole = await channel.guild.roles.create({
        name: `${categoryRes.name}-role`,
        color: "Random",
      });
      await channel.guild.channels.create({
        name: `${categoryRes.name}-text`,
        type: 0,
        parent: categoryRes.id,
      });
      await channel.guild.channels.create({
        name: `${categoryRes.name}-voice`,
        type: 2,
        parent: categoryRes.id,
      });

      const everyoneRole = channel.guild.roles.cache.find(
        (role) => role.name === "@everyone"
      );

      channel.permissionOverwrites.create(everyoneRole, {
        ViewChannel: false,
      });

      channel.permissionOverwrites.create(channelRole, {
        ViewChannel: true,
        SendMessages: true,
      });
      console.log(
        `Successfully created a new category with the name '${categoryRes.name}'`
      );
    } catch (error) {
      console.log("There was an error:", error);
    }
  });

  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );
};
