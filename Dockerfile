FROM node:18

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y libaio1 curl unzip

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar TODO (incluyendo node_modules)
COPY . .

# Exponer el puerto en que corre tu app
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
