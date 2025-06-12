FROM node:18

WORKDIR /usr/src/app

# Copiar todo (incluyendo node_modules que ya instalaste localmente)
COPY . .

# Exponer el puerto de tu app (ajusta si usas otro)
EXPOSE 3000

# Comando para ejecutar tu backend
CMD ["npm", "start"]
