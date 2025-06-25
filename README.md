# Documentation – Système de Verrouillage Sécurisé

Ce projet met en place un système de verrouillage par mot de passe grâce à Node.js et Express. Il repose sur :
- Un fichier de configuration (`config.json`) définissant le mot de passe et les délais de blocage (en millisecondes).
- Un fichier d’état (`admin.json`) enregistrant les tentatives, les périodes de verrouillage et les éventuels bannissements.
- Une interface web accessible via **index.html** dans le dossier `public/`, permettant la saisie du mot de passe.
- Une page **unlock.html** où se trouve le contenu protégé.

---

## Structure du Projet

L’arborescence du projet doit suivre cette structure :

ton-projet/
├── config.json ← Paramètres : mot de passe, délais de blocage, etc.
├── admin.json ← État dynamique : tentatives, verrouillage, bannissement.
├── server.js ← Serveur Express (Node.js) gérant l’authentification.
└── public/
├── index.html ← Page d’authentification.
└── unlock.html ← Page affichée après connexion réussie.


---

## Installation de Node.js

1. **Téléchargez Node.js**

   Rendez-vous sur [nodejs.org](https://nodejs.org/) et téléchargez la version LTS (recommandée).

2. **Vérifiez l’installation**

   Dans une console (CMD, PowerShell ou Terminal), exécutez :

   ```bash
   node -v
   npm -v

Ces commandes doivent afficher les versions installées de Node.js et npm.
Mise en Place du Projet

    Téléchargez ou clonez le projet
    Placez-le dans un dossier, par exemple :
    C:\Users\VotreNom\Documents\monProjet

    Ouvrez une console dans ce dossier

cd "C:\Users\VotreNom\Documents\monProjet"

Installez les dépendances

    npm install express body-parser

Configuration
config.json

Ce fichier définit les paramètres principaux du système :

{
  "PASSWORD": "test1234",
  "ENABLE_BLOCKING": true,
  "MAX_ATTEMPTS_SHORT_LOCK": 3,
  "MAX_TOTAL_ATTEMPTS_BAN": 15,
  "SHORT_LOCK_DURATION": 300000,
  "LONG_LOCK_DURATION": 900000
}

    Note : Les durées sont exprimées en millisecondes. Vous pouvez les ajuster selon vos besoins.

admin.json

Ce fichier conserve l’état des tentatives. Il est mis à jour automatiquement :

{
  "attempts": 0,
  "lockUntil": 0,
  "banned": false
}

Pour réinitialiser manuellement le système, remplacez simplement son contenu par cet exemple.
Lancer le Serveur

    Démarrer le serveur

    Dans le terminal, exécutez :

node server.js

Vous verrez un message comme :

✅ Serveur lancé sur http://localhost:3000

Accéder à l’interface web

Ouvrez votre navigateur et allez à l’adresse suivante :

    http://localhost:3000

    La page index.html s’affiche et vous permet de saisir le mot de passe.

Fonctionnement

    Connexion réussie :
    Si le mot de passe est correct, l'utilisateur est redirigé vers unlock.html, et le fichier admin.json est réinitialisé.

    Mot de passe incorrect :
    Chaque échec incrémente attempts.

        En dessous de MAX_ATTEMPTS_SHORT_LOCK → pas de blocage.

        À partir de cette limite → blocage temporaire court.

        Si les tentatives dépassent MAX_TOTAL_ATTEMPTS_BAN → bannissement complet.

    Blocage temporaire :
    Un message indique le temps d’attente restant avant de réessayer.

Contenu Protégé

Modifiez public/unlock.html pour y insérer tout ce que vous souhaitez protéger : texte, documents, liens, etc. Cette page ne sera accessible qu’après authentification réussie.
Arrêter le Serveur

    Méthode rapide : appuyez sur CTRL + C dans le terminal.

    Méthode alternative : fermez simplement la fenêtre du terminal.

Résumé des Commandes

# Se placer dans le dossier du projet
cd "C:\Chemin\Vers\Votre\Projet"

# Installer les dépendances
npm install express body-parser

# Lancer le serveur
node server.js
