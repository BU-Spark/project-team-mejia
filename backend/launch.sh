#!/bin/bash
# 创建好database之后要进行一次初始migration, 这次migration会根据我们的prisma schema在database里面创建相应的table。migration之后要generate prisma client，就相当于一个database client，我们对database的操作都是通过这个client，然后运行src文件夹里面的scripts.ts,这个会把我们已有的数据都加到database里面去
npx prisma migrate dev --name init
npx prisma generate
# RUN npx prisma introspect
npx ts-node ./src/scripts.ts

npm start
