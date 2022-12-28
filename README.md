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

- "channels" => channels.js => Requests an input for the category name and creates a category, a text and a voice channel.
- "trainer" => trainer.js => Creates a private category for trainers, with a text and a voice channels.
- "welcome" => welcome.js => Creates a private welcome text channel and a default role which will be assigned when entering the server. Then the user can choose their new role and lose the default role via the text channel.
- "roles" => roles.js => Requests an input for the desired role and lists all the members ids of it.
- "invitations" => invitations.js => Generates a link invitation.
- "ping" => ping.js => Pings a user

# Instructions

1. First create all the necessary channels (/channels) for the server, this will also create a role for each channel.
2. Then, you can create the welcome page (/welcome), for users to pick their role.
3. Create a trainer category (/trainer).
4. Start sharing your discord link (/invitations).
