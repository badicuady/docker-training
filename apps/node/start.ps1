docker remove -f node
docker build --tag node:latest .
docker run --name node --rm -d -p 3000:3000 --net net node:latest