FROM node:18

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y libaio1 curl unzip

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar todos los archivos primero
COPY . .

# Instalar dependencias (asegúrate de que package.json y package-lock.json estén incluidos)
RUN npm install

# Exponer el puerto que usa la app
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]
