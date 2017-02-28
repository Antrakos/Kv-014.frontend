FROM debian:jessie

WORKDIR /tmp

RUN apt-get update -y
RUN apt-get install -y \
    curl bzip2 git-core

RUN curl --silent --location https://deb.nodesource.com/setup_0.12 | bash -
RUN apt-get install --yes nodejs
RUN npm install -g bower gulp nodemon

VOLUME /var/www/admin/src

RUN mkdir -p /var/www/admin
WORKDIR /var/www/admin

ADD / /var/www/admin

RUN npm install
RUN bower install --allow-root --force
RUN gulp build || true

EXPOSE 8001
ENTRYPOINT ["node", "./src/server/app.js"]
