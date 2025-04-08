# Platzi Message

Este es un proyecto de mensajería en tiempo real, creado con React y Node.js. Esta inspirado en diversos cursos de Platzi, tome prestada tambien su paleta de colores.

## Estructura del proyecto

El proyecto consta de dos partes:

- `backend`: El servidor backend que maneja la lógica del negocio y la autenticación.
- `message`: El cliente frontend que maneja la interfaz de usuario y la interacción con el usuario.

## Tecnologías

- `backend`: Node.js, Express, Sequelize, PostgreSQL, Socket.io, Passport.js, JWT.
- `message`: React, Vite, React Router, React Hot Toast, Socket.io Client, Zustand.

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/joselatino/platzi-message.git
```

2. Instalar dependencias:
```bash
# Backend
npm install

# Frontend
npm install
```

3. Configurar variables de entorno:
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp message/.env.example message/.env
```
4. La base de datos:\
Cree un archivo docker-compose.yml en el directorio raiz del backend, puedes correr este docker-compose si quieres o usar un postgres local.

5. Iniciar el servidor:
```bash
# Backend
npm run dev

# Frontend
npm run dev
```

## Estado del proyecto

El proyecto funciona correctamente en el navegador de desktop, no obstante no funciona correctamente en el navegador de celular.
