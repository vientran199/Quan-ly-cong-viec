FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
# COPY excute.sh ./

# RUN npm install && npm i -g serve && chmod +x ./excute.sh && mkdir build
RUN npm install
# COPY ./build ./build
COPY . .

EXPOSE 3000

CMD ["npm","start"]
