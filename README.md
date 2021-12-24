PROJET KWIZZ
======

## Setup Client

1. Installer [Node.js](https://nodejs.org/en/) *(Projet testé avec node v16.13.1 sur Windows)*
2. *Utiliser nvm pour installer d'autres versions de node [ici](https://github.com/nvm-sh/nvm)*
3. Cloner le projet
4. `cd client`
5. Utiliser la commande  `npm install` ou `yarn install` *(utiliser yarn de préférence)* pour installer toutes les dépendances nécessaires.
6. *Installer yarn [ici](https://yarnpkg.com/lang/fr/).*

**Erreurs probables:**</br>
1. Pour toute erreur au lacement d'une commande d'installation ou pour lancer le projet : *Utiliser Node v16.13.1.*
2. Erreur au niveau de Eslint et Prettier (le .vscode est censé résoudre le pb) *(Si pb persiste, désactivez les 2 plugins pour lancer le projet)*
3. Sur linus OS si `yarn start` marche pas, dans package.json supprimer `SET` dans cette ligne (l33)  `"start": "SET NODE_ENV=development && react-scripts start",` 
4. Verifiez bien que le serveur socket fonctionne pour ne pas avoir des erreurs react sur le client

## Modules ajoutés
### Client
- [x] Typescript - Typage fort, qualité du code</br>
- [x] Motion Framer - Animations et transitions</br>
- [x] Eslint/Prettier - Pour la mise en forme du code et correction de la syntaxe
- [x] Redux - Gestionnaire de state</br>

### Server
- [x] Nodemon - restart server auto après modifs</br>