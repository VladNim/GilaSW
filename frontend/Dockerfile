FROM node:lts AS development

EXPOSE 4200

RUN mkdir -p /app/public /app/src

WORKDIR /app

COPY . /app

RUN npm install

CMD ["npm", "start"]