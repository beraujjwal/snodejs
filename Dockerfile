FROM node:18.18.0

#RUN npm install -g npm@9.8.1

WORKDIR "/app"

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R node /app/node_modules

USER node

#EXPOSE 4004

CMD ["/bin/bash", "-c", "npm run dev"]

#CMD ["npm", "run", "dev"]