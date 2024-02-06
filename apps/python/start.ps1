docker remove -f python
docker build --tag python:latest .
docker run --name python --rm -d -p 4100:4100 --net net python:latest