# Imagen base de Node.js
FROM node:18

# Instalar dependencias necesarias del sistema
RUN apt-get update && apt-get install -y \
  libaio1 \
  unzip \
  && rm -rf /var/lib/apt/lists/*

# Crear el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias de Node.js
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Copiar Oracle Instant Client al contenedor en la ruta correcta
COPY oracle_instantclient /oracle_instantclient/instantclient_21_18

# Configurar variables de entorno para Oracle Instant Client
ENV LD_LIBRARY_PATH=/oracle_instantclient/instantclient_21_18:$LD_LIBRARY_PATH
ENV PATH=/oracle_instantclient/instantclient_21_18:$PATH
ENV OCI_LIB_DIR=/oracle_instantclient/instantclient_21_18
ENV OCI_INC_DIR=/oracle_instantclient/instantclient_21_18/sdk/include

# Exponer el puerto que usa la app
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]
