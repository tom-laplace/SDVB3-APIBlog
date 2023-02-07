### Stage 1 - the build process
FROM node:14 AS builder

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

### Stage 2 - the production environment
FROM node:14-alpine AS runner

WORKDIR /app
COPY --from=builder /app/build ./build
COPY package*.json ./

RUN npm install --only=production

EXPOSE 4005
CMD ["npm", "start"]