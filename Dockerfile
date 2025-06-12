FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force
RUN npm ci --prefer-offline --no-audit --progress=false

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
