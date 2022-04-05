FROM node:14

WORKDIR /boosterthon-app
COPY package.json .
RUN npm install
COPY . .
# CMD npm start
CMD node server.js