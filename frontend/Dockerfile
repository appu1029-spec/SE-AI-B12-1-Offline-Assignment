# ---------- STAGE 1: build the React app ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- STAGE 2: serve the built files ----------
FROM nginx:alpine

# Vite outputs to /dist. Create React App outputs to /build
COPY --from=build /app/dist /usr/share/nginx/html

# Our own config so page refresh does not 404
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]