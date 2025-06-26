# 🔐 open web page locker v0.2
Open Web Page Locker est un système de verrouillage de pages web par mot de passe.
Cette version est conçue pour une utilisation locale uniquement, à des fins de test ou d’apprentissage.
Elle utilise un serveur Node.js simple, hébergé sur votre propre machine.

## 🧪 À propos de cette version
Cette version du projet est conçue pour une utilisation locale uniquement, sans connexion à Internet. Elle fonctionne à l’aide de fichiers simples, comme un fichier `config.json` pour stocker le mot de passe, et ne transmet ni ne stocke aucune donnée en ligne. cependant Il est possible d’adapter ce projet à un usage en ligne (par exemple avec un nom de domaine), mais cela comporte des risques si c’est mal configuré. Une exposition non sécurisée pourrait rendre le mot de passe ou les données accessibles. Il est donc essentiel de mettre en place un chiffrement, une authentification robuste, et de protéger l’accès aux fichiers sensibles.

### ✏️ Ajouts/Modifications
1. Le système de blocage des tentatives est global :  
le nombre maximal d’essais est comptabilisé pour **tous les utilisateurs**.  
Si ce nombre est dépassé, **le verrouillage s’applique à tout le monde** jusqu’à la levée du blocage. 



### 🐞 Corrections de bugs

* Vide

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
```

### 🛑 Arrêter le serveur
* Méthode 2 : Fermez simplement la fenêtre du terminal
