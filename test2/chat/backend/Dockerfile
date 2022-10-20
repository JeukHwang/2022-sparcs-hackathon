FROM node:15-alpine
WORKDIR /docker/chat
RUN apk add git
RUN git clone -b docker-seminar https://gitlab.com/triangleyj/2021-summer-wheel-assignment.git
RUN npm install
ENTRYPOINT ["npm", "start"]