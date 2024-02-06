FROM node:lts-buster AS build

WORKDIR /app

COPY ./package.json ./

RUN npm install

FROM build AS publish

COPY ./index.js ./index.js
COPY ./webpack.config.js ./webpack.config.js

RUN npm run build

FROM node:lts-alpine AS final

WORKDIR /app

EXPOSE 3100

COPY --from=publish /app/dist/publish.js .

ENTRYPOINT ["node", "publish.js"]