FROM node:14
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY --from=0 /app/cert /app/ssl
COPY default.conf /etc/nginx/nginx.conf

