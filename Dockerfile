FROM node:18-alpine

# Arbeitsverzeichnis im Container
WORKDIR /app

# Server-Code kopieren
COPY server.js ./
COPY public ./public

# Port öffnen
EXPOSE 3000

# Server starten
CMD ["node", "server.js"]
