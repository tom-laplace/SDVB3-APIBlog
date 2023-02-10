## API Blog - A blog API

Exercice pour la matière "Backend" de Sup de Vinci.

Simple API d'un blog basique avec Users, Posts et Comments.

### Run le projet
### Authentication 

``` npm run keygen ```

Nécessite ensuite de copier la clé générée dans le fichier .env dans la variable JWT_SECRET.

Renseigner les variables d'environnement dans un fichier .env en s'inspirant du fichier .env.example.

``` npm install ```	

``` docker-compose up -d ```
``` npm run build && npm run start```

API Disponible sur le port 4004 (http://localhost:4004)

### Todo 

- [ X ] Profile.owner = Account.id
- [ ] Post.owner = Profile.id
- [ ] Comment.owner = Profile.id
- [ ] req.account = Account.id
- [ ] pagination

⚠️ ATTENTION à la vérification (Profile.owner === Account.id) pour les method "POST, UPDATE, DELETE" ⚠️

### Todo hors cours 

- [ ] Ajouter un champ "isPublished" dans le model Post
- [ ] Ajouter un champ "isPublished" dans le model Comment
- [ ] Refacto 'any' types 
- [ ] Refacto imports 
- [ ] Refacto verif middlewares
- [ ] Refacto routes as try catch with better error handler
- [ ] Ecrire tests
- [ ] Mettre en place déploiement
