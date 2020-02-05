FROM node:12-slim

RUN npm install -g gulp-cli browser-sync
WORKDIR /app

RUN chown -R 1000:1000 /app
USER 1000

EXPOSE 3000 3001
COPY ./app/package*.json ./
RUN npm install
COPY ./app/gulpfile.js .

CMD tail -f /dev/null
