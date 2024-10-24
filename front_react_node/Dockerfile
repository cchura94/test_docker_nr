FROM node:20 as build

# establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos del proyecto
COPY package*.json ./

# Instalar los paquetes de node (dependencias de node)
RUN npm install

# Copiar el resto del codigo
COPY . .

RUN npm run build

# -------------------------------------------------------

# Configurar Nginx para servir la aplicación
FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copiar la configuracion de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto donde levntará el servidor
EXPOSE 80

# Comando para correo la aplicación
CMD [ "nginx", "-g", "daemon off;" ]