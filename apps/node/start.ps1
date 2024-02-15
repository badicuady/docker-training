docker remove -f node
docker build --tag node:latest .
docker run --name node --rm -d -p 3100:3100 --net net node:latest