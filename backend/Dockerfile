FROM node:16.8.0
WORKDIR /code

COPY . .

# add `/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH
# ENV PATH="./node_modules/.bin:$PATH"

ENV PORT 5000
EXPOSE 5000

# install app dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json
# RUN apt-get update    # ==> not a good idea to run in container
# RUN apt-get install libssl1.1 libssl-dev  # ==> Those package doesn't exist in 16.8.0-slim. Slim version took out the openssl-y package to compress the size to make it smaller, but out backend required it to build container successfully
# RUN apt-get install openssl-y   

# RUN npm ci --production
RUN npm install

# RUN npm run build

# start app
CMD ["bash", "./launch.sh"]

# docker build -t sample:dev .
# docker run -it -p 3000:3000 simple-react-app
# $ docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true sample:dev


# Reference:
# Dockerizing a React App, https://mherman.org/blog/dockerizing-a-react-app/
# Heroku + Docker with Secure React in 10 Minutes, https://developer.okta.com/blog/2020/06/24/heroku-docker-react