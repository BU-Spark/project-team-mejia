#!/bin/bash

npx prisma migrate dev --name init
npx prisma generate
# RUN npx prisma introspect
npx ts-node ./src/scripts.ts

npm start
