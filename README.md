## API Blog - A blog API

Exercice pour la matière "Backend" de Sup de Vinci.

Simple API d'un blog basique avec Users, Posts et Comments.

### Run le projet

``` docker-compose up ```
``` npm run build && npm run start```

API Disponible sur le port 4004 (http://localhost:4004)

### Cas de production 

Si volonté de mise en production, il ne faut pas push le fichier .env dans le repo. Il faut donc le supprimer et le recréer avec les variables d'environnement accurate à votre BDD Mongo de production.

### Authentication 

``` npm run keygen ```

Nécessite ensuite de copier la clé générée dans le fichier .env dans la variable JWT_SECRET.
