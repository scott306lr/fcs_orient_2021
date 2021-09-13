FROM node:12

WORKDIR /socket

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8900

CMD ["npm", "start"]