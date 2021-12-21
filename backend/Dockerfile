FROM node:16.8.0
WORKDIR /code

COPY . .

# add `/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH
# ENV PATH="./node_modules/.bin:$PATH"

ENV PORT 443
EXPOSE 443

# install app dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json


RUN npm ci --production
RUN npm install

# RUN npm run build

# start app
CMD ["bash", "./launch.sh"]



# Reference:
# Dockerizing a React App, https://mherman.org/blog/dockerizing-a-react-app/
# Heroku + Docker with Secure React in 10 Minutes, https://developer.okta.com/blog/2020/06/24/heroku-docker-react