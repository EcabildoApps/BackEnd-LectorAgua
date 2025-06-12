FROM node:18

# Instalar dependencias necesarias para oracledb
RUN apt-get update && apt-get install -y libaio1 curl unzip

# Variables de Oracle Instant Client
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient \
    OCI_LIB_DIR=/opt/oracle/instantclient

# Instalar Oracle Instant Client
RUN mkdir -p /opt/oracle && \
    curl -O https://download.oracle.com/otn_software/linux/instantclient/211000/instantclient-basic-linux.x64-21.1.0.0.0.zip && \
    curl -O https://download.oracle.com/otn_software/linux/instantclient/211000/instantclient-sdk-linux.x64-21.1.0.0.0.zip && \
    unzip instantclient-basic-linux.x64-21.1.0.0.0.zip -d /opt/oracle/ && \
    unzip instantclient-sdk-linux.x64-21.1.0.0.0.zip -d /opt/oracle/ && \
    rm *.zip && \
    ln -s /opt/oracle/instantclient_21_1 /opt/oracle/instantclient && \
    ln -s /opt/oracle/instantclient/libclntsh.so.21.1 /opt/oracle/instantclient/libclntsh.so && \
    ln -s /opt/oracle/instantclient/libocci.so.21.1 /opt/oracle/instantclient/libocci.so

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
