#FROM node:alpine
FROM node:8.1.2-slim
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install -g typescript
RUN npm install --production --silent && mv node_modules ../ && npm install -g ts-node pm2
COPY . .
EXPOSE 2657
CMD npm start
