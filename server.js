const express = require("express");
const { token, guildId } = require("./config.json");
const { REST, Routes } = require("discord.js");
const PORT = 3000;

module.exports = (client) => {
  const app = express();
  app.use(express.json());

  app.get("/:channel", async (req, res) => {
    console.log("here");
    const rest = new REST({ version: "10" }).setToken(token);
    const response = await rest.post(Routes.guildChannels(guildId), {
      body: {
        name: req.params.channel,
        type: 2,
      },
    });
  });

  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );
};
