FROM node:23-alpine AS build

WORKDIR /app

COPY package.json package-lock.json vite.config.js ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.29-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/maps360 /usr/share/nginx/html/maps360
COPY nginx.conf /etc/nginx/conf.d/default.conf

LABEL org.opencontainers.image.source=https://github.com/IdntknowhY/sfeduMap

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
