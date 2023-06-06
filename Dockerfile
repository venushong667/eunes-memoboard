FROM node:14

RUN apt-get update -y && apt-get install -y supervisor

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir /app
ADD . /app

RUN wget https://releases.hashicorp.com/consul/1.13.3/consul_1.13.3_linux_amd64.zip && unzip consul_1.13.3_linux_amd64.zip && mv consul /usr/local/bin/

WORKDIR /app

RUN npm install

ENV NODE_ENV=prod

CMD ["/usr/bin/supervisord"]
