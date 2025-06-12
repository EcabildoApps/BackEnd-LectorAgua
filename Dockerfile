FROM node:18

# Instalar dependencias necesarias para oracledb y sharp
RUN apt-get update && apt-get install -y \
  build-essential \
  libjpeg-dev \
  libpng-dev \
  libwebp-dev \
  libtiff-dev \
  libgif-dev \
  libvips-dev \
  libaio1 \
  && rm -rf /var/lib/apt/lists/*

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código
COPY . .

# Copiar instantclient (ya instalado en tu host en /opt/oracle/instantclient_21_18)
# OJO: Esto asume que estás construyendo desde el host que tiene este folder
COPY /opt/oracle/instantclient_21_18 /opt/oracle/instantclient_21_18

# Establecer variables de entorno para oracledb
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_21_18
ENV PATH=$LD_LIBRARY_PATH:$PATH

# Exportar puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
