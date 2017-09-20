FROM node:latest
WORKDIR /usr/src/app
# Update Ubuntu Image 
RUN apt-get update -y -q && apt-get upgrade -y
# Install app dependencies
COPY . .
RUN npm install -g --silent pm2 && npm install --production --silent
# Install typescript tranpiller
RUN pm2 install typescript
EXPOSE 2657
# CMD npm start
