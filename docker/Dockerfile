FROM node:20-alpine
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY src /app/src
COPY examples /app/examples
COPY .env.example /app/.env
EXPOSE 3000
CMD ["node","src/api/server.js"]
