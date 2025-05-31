# Etapa 1: Compilar la aplicación Angular
FROM node:18 AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY package*.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la app (asegúrate de que sea --configuration=production si usas Angular >13)
RUN npm run build --configuration=production

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar los archivos construidos al directorio de Nginx
COPY --from=builder /app/dist/client /usr/share/nginx/html

# Opcional: Copiar una configuración personalizada de Nginx (si tienes)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto que usa Nginx
EXPOSE 80

# Comando por defecto de Nginx
CMD ["nginx", "-g", "daemon off;"]
