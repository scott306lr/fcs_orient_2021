FROM node:12

WORKDIR /api

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]