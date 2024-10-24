FROM node:20

# establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos del proyecto
COPY package*.json ./

# Instalar los paquetes de node (dependencias de node)
RUN npm install

# Copiar el resto del codigo
COPY . .

# Exponer el puerto donde levntará el servidor
EXPOSE 3000

# Comando para correo la aplicación
CMD [ "npm", "run", "dev" ]