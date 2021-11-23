FROM node:16.8.0-slim
WORKDIR /code

# add app
COPY . ./

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH
# ENV PATH="./node_modules/.bin:$PATH"

# Frontend 8000; Backend 5000
ENV PORT 8000
EXPOSE 8000

# install app dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json
# RUN npm ci --production

# RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm install


# start app
CMD ["npm", "run", "develop"]

# docker build -t sample:dev .
# docker run -it -p 3000:3000 simple-react-app
# $ docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true sample:dev


# Reference:
# Dockerizing a React App, https://mherman.org/blog/dockerizing-a-react-app/
# Heroku + Docker with Secure React in 10 Minutes, https://developer.okta.com/blog/2020/06/24/heroku-docker-react