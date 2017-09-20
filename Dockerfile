FROM node:latest
WORKDIR /usr/src/app
# Update Ubuntu Image 
RUN apt-get update -y -q && apt-get upgrade -y
# Install app dependencies
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install -g --silent pm2 && npm install --production --silent && mv node_modules ../
# Install typescript tranpiller
RUN pm2 install typescript
COPY . .
EXPOSE 2657
# CMD npm start
