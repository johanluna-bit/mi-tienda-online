# 1. Usar una imagen base de Node.js ligera y optimizada
FROM node:24

# 2. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# 3. Copiar package.json y package-lock.json para aprovechar el cache de Docker
COPY package*.json ./

# 4. Instalar solo las dependencias de producción
RUN npm install --only=production

# 5. Copiar el resto de los archivos de la aplicación
COPY . .

# 6. Exponer el puerto en el que correrá la aplicación
EXPOSE 3000

# 7. Comando para iniciar la aplicación cuando se ejecute el contenedor
CMD [ "node", "server.js" ]