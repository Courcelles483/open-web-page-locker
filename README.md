> [!CAUTION]
> Le script s'exécute en local, mais il n'est pas prêt : en raison de son développement, aucun système de chiffrement n’a été ajouté, ce qui comporte des risques de sécurité.
---
# Open Web Page Locker

Open Web Page Locker est un système de verrouillage de pages web par mot de passe.
Cette version est conçue pour une utilisation locale uniquement, à des fins de test ou d’apprentissage.
Elle utilise un serveur Node.js simple.
## 🧪 À propos de cette version
Cette version du projet est conçue pour une utilisation locale uniquement, sans connexion à Internet. Elle fonctionne à l’aide de fichiers simples, comme un fichier `config.json` pour stocker le mot de passe, et ne transmet ni ne stocke aucune donnée en ligne. cependant Il est possible d’adapter ce projet à un usage en ligne (par exemple avec un nom de domaine), mais cela comporte des risques si c’est mal configuré. Une exposition non sécurisée pourrait rendre le mot de passe ou les données accessibles. Il est donc essentiel de mettre en place un chiffrement, une authentification robuste, et de protéger l’accès aux fichiers sensibles.

### ✏️ Ajouts/Modifications
1. Le système de blocage des tentatives est global :  
le nombre maximal d’essais est comptabilisé pour **tous les utilisateurs**.  
Si ce nombre est dépassé, **le verrouillage s’applique à tout le monde** jusqu’à la levée du blocage.



### 🐞 Corrections de bugs

* Vide

### 📌 Objectifs pour la prochaine version

- 🔒 Empêcher l'accès direct à la page HTML `unlock.html`
- ⏱️ Utiliser un temps en **secondes** au lieu de **millisecondes**
- 🧭 Ajouter un **menu de gestion** intégré à l'interface
- 🎨 Améliorer l'apparence HTML (design plus moderne)
- 🐛 Tester si le code ne bugue pas avec un changement de port pour la redirection vers unlock.html
- 🔄 Faire en sorte que le serveur vérifie régulièrement pour bloquer les requêtes, dans le cas où le verrouillage est activé. (car si un autre rate sa le blocker sa se mettre a jours pour touts et que perosne)
- 👨🏼‍💻Mofier la confige et blockge par cmd (et les image de fond)

## ⚙️ Exécution du projet


### ✅ Prérequis

- [Node.js](https://nodejs.org/) installé sur votre système

### 🛠️ Étapes de lencmnent 
1. **Ouvrir la fenêtre Exécuter**  
   Appuie simultanément sur les touches **[Win] + R** de ton clavier.  
   Cela ouvre une petite fenêtre appelée « Exécuter ».

2. **Lancer l’invite de commandes**  
   Dans cette fenêtre, tape `cmd` puis clique sur **OK** ou appuie sur **Entrée**.  
   Cela ouvre une fenêtre noire appelée « Invite de commandes ».

3. **Se déplacer dans le dossier du projet**  
   Dans l’invite de commandes, tape la commande suivante :  
```

cd chemin\vers\ton\projet

```
Remplace `chemin\vers\ton\projet` par le chemin exact du dossier où se trouve ton projet.  
Par exemple :  
```

cd C:\Users\user_1\Documents\MonProjet

```
Appuie ensuite sur **Entrée**.

4. **Lancer le serveur Node.js**  
Une fois dans le bon dossier, tape la commande suivante :  
```

node server.js

```
Puis appuie sur **Entrée**.  
Cela démarre ton serveur.


### 🛑 Arrêter le serveur
Fermez simplement la fenêtre du terminal.

## 🔧 Personnalisation du système

Pour personnaliser ton système, il suffit d’éditer deux fichiers situés à la racine de ton projet et de modifier la valeur en question :

Tu as deux fichiers :
- `config.json`
- `admin.json`


### 🛠️ config.json

Comme son nom l’indique, ce fichier sert à la configuration : il permet de définir le temps de blocage et le nombre d’essais.
admin.json
```
{
  "PASSWORD": "tonMotDePasse",            // ← mot de passe maître
  "ENABLE_BLOCKING": true,                // ← activer le blocage après erreurs
  "MAX_ATTEMPTS_SHORT_LOCK": 3,           // ← nombre d’échecs avant verrou court
  "MAX_TOTAL_ATTEMPTS_BAN": 15,           // ← nombre total d’échecs avant blocage du système
  "SHORT_LOCK_DURATION": 300000,          // ← durée verrou court (ms)
  "LONG_LOCK_DURATION": 900000            // ← durée verrou long (ms)
}
```
### 🔒 admin.json

Ce fichier sert à la gestion du blocage du système :
```
{
  "attempts": 0,      // ← compteur d’échecs depuis la dernière réussite
  "lockUntil": 0,     // ← timestamp (ms) jusqu’à la fin du verrouillage (remettre à zéro pour débloquer)
  "banned": false     // ← true si l’utilisateur est définitivement banni
}
```
