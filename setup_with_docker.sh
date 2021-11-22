#!/bin/bash

# build the backend container
docker build -t backend:dev ./backend

# build the frontend container
docker build -t front-end:dev ./frontend

# start the frontend
docker run -it --rm -v ${pwd}:/code -v /code/node_modules -p 8000:8000 front-end:dev

# start the backend
docker run -it --rm -v ${pwd}:/code -v /code/node_modules -p 5000:5000 backend:dev

# start the ES container
# docker run -d --name es --net foodtrucks-net -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.3.2

# start the flask app container
# docker run -d --net foodtrucks-net -p 5000:5000 --name foodtrucks-web prakhar1989/foodtrucks-web