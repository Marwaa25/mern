# Utilisez une image de base appropriée pour votre projet
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances du serveur
RUN npm install

# Copier le code source du serveur dans le conteneur
COPY server/ ./server/

# Copier le code source du client dans le conteneur
COPY client/ ./client/

# Construire le client (si nécessaire, selon votre configuration)
# RUN cd client && npm install && npm run build

# Exposer le port nécessaire pour le serveur (selon votre configuration)
EXPOSE 3000

# Définir la commande pour exécuter le serveur lorsque le conteneur démarre
CMD ["node", "server/src/index.js"]
