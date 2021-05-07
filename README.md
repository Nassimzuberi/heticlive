# Projet Twitch coté back-end avec Express

lien en ligne : https://heticlive.herokuapp.com

Nous sommes deux à avoir travailler sur ce projet : Xavier JEANTIS et Nassim ZUBERI.

A mettre dans le .env
### `FFMPEG_PATH`
Chemin vers le ffmpeg utilisé dans la config Node Media Server
### `DB_URI`
L'uri de la base de donnée utilisé (celle que j'ai utilisé est dans le .env.example)

## Réalisation
CRUD User, Channel \
API d'authentification \
Websocket pour faire un chat en temps réel par channel \
Serveur de livevideo avec Node Media Server par channel

## Problèmes rencontrés (X = réalisé)

Mise en ligne du front avec Netlify donc Https => refuse de faire une requête sur du http \
Heroku ne permet pas d'utiliser plusieurs ports donc pas de live video en ligne \
Tentative de mise en ligne avec Azure mais échoué \
La multi resolution est disponible sur le server mais il manque une information pour pouvoir le changer dans le front \
Utiliser le websocket du serveur back avec le front pour faire le chat (X) \
Séparer les chats par channel (X) \
Mise en place de la vidéo sur le front (X) \
Créer une clef par channel de stream (X) \
Utiliser un token d'authentification (réalisé que du côté back)

## Liens
`https://heticlive.herokuapp.com/users` => api rest users

`https://heticlive.herokuapp.com/channels` => api rest channels

`https://heticlive.herokuapp.com/users/:id/channels` => api pour avoir les channels d'un user
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3001) to view it in the browser.

