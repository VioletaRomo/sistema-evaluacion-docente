FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Instalamos Angular CLI global
RUN npm install -g @angular/cli@16

# Instalamos dependencias (ahora sí deberían encajar perfecto)
RUN npm install

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]