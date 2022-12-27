Documentation

To run

```
git clone https://github.com/Srizza93/simone-bot.git

npm install

npm run dev
```

# Please create a config.json file with the below variables:

- token
- clientId
- guildId
- adminId

Commands are deployed from deploy-commands.js and then they are executed via index.js.

# Slash Commands

- "welcome" => welcome.js => creates a private welcome text channel and a default role for users to pick their role
- "roles" => roles.js => Requests an input for the desired role and lists all the members ids of it.
- "channels" => channels.js => Requests an input for the category name and creates a category, a text and a voice channel.
- "invitations" => invitations.js => Generates a link invitation.
- "ping" => ping.js => Pings a user
