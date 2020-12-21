FROM node:12
WORKDIR /userapi
COPY package.json .
RUN npm install
EXPOSE 3000
COPY . .
CMD [ "npm", "start" ]
