## BACKEND (NODE)

### En el proyecto backend NODE (back_node_react)
```
npm install
```
### Crear una Base de datos en MYSQL 
- El nombre de la Base de datos lo encontramos en el archivo back_node_react/src/config/database.json
(nr_bd1)
### Migrar y generar las tablas en la Base de datos
```
npm run migrate
```
### Ejecutar los seeder (cargar datos en la base de datos) - crear un usuario por defecto
- back_node_react/src/seeders/*

```
npm run seed
```
### Levantar el servidor en (DESARROLLO)
```
npm run dev
```

## FRONTEND (REACT)
### En el proyecto Frontend React (front_react_node)
```
npm install
```
### Levantar el servidor de (DESARROLLO)
```
npm run dev
```

### Ingresar al navegador (http://localhost:5173/login)
- Ingresar las credenciales:
```
correo: admin@mail.com
contraseña: admin54321
```