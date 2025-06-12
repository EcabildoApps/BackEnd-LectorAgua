FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

# Instalación limpia
RUN npm install

# Copiar el resto del código
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
