   ## open-web-page-locker

### Détails de la version
Cette pré-release est un prototype non sécurisé, stocké localement dans le navigateur. Elle vous permet de modifier le code et d’effectuer des tests simples sans installer de serveur.
### Exécution du projet
Ouvrez le fichier index.html dans votre navigateur (ou index.json selon votre configuration).
### Modification des données
> [!NOTE]
> Les données ne sont créées que si vous saisissez un code erroné. Elles ne sont pas générées automatiquement, et comme cette pré-release ne sert qu’à tester le stockage local des données dans le navigateur, je n’ai pas modifié ce comportement.

Sous Firefox
Pour les autres navigateurs, consultez la documentation de l’outil développeur pour savoir comment modifier le stockage local.
Note
Les clés de stockage (Local Storage) sont initialisées à la première saisie d’un mot de passe incorrect. Les prochaines versions, côté serveur, géreront automatiquement la persistance des données.

Procédure
- Appuyez sur F12 pour ouvrir les outils de développement.
- Sélectionnez l’onglet Storage (Stockage).
- Dans la section Local Storage, choisissez le domaine de votre site.
- Modifiez les clés suivantes :
- lock, unit, time (champs verrouillés par défaut)
- attempts (nombre de tentatives d’authentification autorisées)
