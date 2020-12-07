FROM node:12
WORKDIR /userapi
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]
