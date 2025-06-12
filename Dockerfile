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

# Copiar el Oracle Instant Client al contenedor
COPY oracle_instantclient /opt/oracle/instantclient_21_18

# Configurar variables de entorno para Oracle Instant Client
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_21_18
ENV PATH=$LD_LIBRARY_PATH:$PATH

# Aceptar la licencia de Oracle (si fuera necesario usar ciertas funciones avanzadas)
ENV OCI_LIB_DIR=/opt/oracle/instantclient_21_18
ENV OCI_INC_DIR=/opt/oracle/instantclient_21_18/sdk/include

# Exponer el puerto que usa tu app (ajústalo si es otro)
EXPOSE 3000

# Comando de inicio de la app
CMD ["node", "index.js"]
