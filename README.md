# 🎵 Musify-app

Aplicación full-stack "clon" de Spotify. Construida con MEAN Stack.
Permite al usuario explorar y escuchar música gestionada por el usuario administrador.

---

## 🚀 Instalación y Ejecución Local

### 1. Levantar MongoDB (si no está corriendo)

```bash
mongod
```
### 2. Instalar dependencias y ejecutar backend
```
cd server
npm install
npm run dev
```
### 3. Instalar dependencias y ejecutar el frontend

```
cd client
npm install
npm run start
```
Por defecto la API se levanta en http://localhost:3000/api y el front en http://localhost:4200 (sino modificar .env y ./client/src/app/services/global.ts)

---
## 🐳 Ejecución con Docker

```bash
docker-compose up --build

