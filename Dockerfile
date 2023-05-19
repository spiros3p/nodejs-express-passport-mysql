FROM node:18.16 AS server-build

ARG PORT_BE

RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend
COPY package*.json /usr/src/backend/
RUN npm install
RUN npm install bcrypt
COPY . /usr/src/backend/
# COPY .env /usr/src/backend/.env
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE ${PORT_BE}

CMD [ "npm", "run", "start" ]