docker remove -f dotnet
docker build --tag dotnet:latest .
docker run --name dotnet --rm -d -p 5000:5000 --net net dotnet:latest