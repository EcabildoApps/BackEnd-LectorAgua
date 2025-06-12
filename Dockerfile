FROM node:18

# Instalar dependencias necesarias para oracledb
RUN apt-get update && apt-get install -y libaio1 curl unzip

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto en que corre tu app (ajústalo si usas otro)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
