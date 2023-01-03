Documentation

Mis en place

```
git clone https://github.com/Srizza93/harry-botter.git

npm install

npm run dev
```

# Veuillez créer un fichier config.json avec les variables ci-dessous:

- token => Allez dans l'outil de développement de l'application, puis cliquez sur 'bot', cliquez sur 'Reset token'.
- clientId => Accédez à l'outil de développement d'applications de discord et cliquez sur 'copier' sur l'ID de l'application.
- guildId => Faites un clic droit sur l'image de la guilde et cliquez sur 'copier l'ID'.
- adminId => Faites un clic droit sur votre profil d'image et cliquez sur 'copier l'ID'.

Les commandes sont déployées à partir de deploy-commands.js, puis elles sont exécutées via index.js.

# Commandes Slash

- "channels" => channels.js => Demander un nom pour la catégorie et créer une catégorie, un canal texte et un vocal, et un rôle associé.
- "trainer" => trainer.js => Créer une catégorie privée pour les formateurs, avec un canal textuel et un canal vocal.
- "welcome" => welcome.js => Créer un canal de texte de bienvenue privé et un rôle par défaut qui sera attribué lors de l'entrée sur le serveur. Ensuite, l'utilisateur peut choisir son nouveau rôle et perdre le rôle par défaut via le canal de texte.
- "roles" => roles.js => Demander un role et répertorier tous les identifiants de ses membres.
- "kickperrole" => kickperrole.js => Demander un role et expulser tous les membres du rôle choisi.
- "kickall" => kickall.js => Expulser tous les membres sauf l'administrateur et le bot, une question de sécurité est demandée.
- "invitations" => invitations.js => Génèrer un lien d'invitation.

# Instructions

1. Créez d'abord tous les canaux nécessaires (/channels) pour le serveur, cela créera également un rôle pour chaque canal.
2. Ensuite, vous pouvez créer la page d'accueil (/welcome), pour que les utilisateurs choisissent leur rôle.
3. Créez une catégorie de formateur (/trainer).
4. Start sharing your discord link (/invitations).
