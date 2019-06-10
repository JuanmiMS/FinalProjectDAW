# Requisitos

1. Npm instalado
2. MongodB con una bbdd llamada 'mypanel'


# Pasos para el despliegue en desarrollo

1. npm install
2. Abrir un terminal y ejecutar npm start
3. En un terminal aparte ejecutar node backend/server.js

El front se desplegará en el puerto 3000, y el back en el 9000

Se recomienda utilizar nodemon en vez de node para desarrollar de una manera mucho más ágil


# Pasos para el despliegue a PRO

1. Conectarse mediante ssh al servidor
2. git pull de la rama master
3. npm install
4. npm run build
5. pm2 restart server

La app se desplegará en el puerto 9000

# Q&A en desarrollo
- La app no puede acceder al servidor
-> Si se está en la rama master, cambiar todas las referencias de juanmi.ovh:9000 a localhost:9000

- Tengo problemas con el CORS
-> Instalar el siguiente plugin y agregar la siguiente dirección: localhost:9000
--> https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
