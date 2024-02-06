docker remove -f frontend
docker build --tag frontend:latest .
docker run --name frontend --rm -d -p 8081:80 --net net frontend:latest