FROM node:lts AS development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3000

COPY . /usr/src/app

RUN npm install typescript
RUN npm run build

ENTRYPOINT [ "node", "dist" ]