# docker network create net

# ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456'

docker run --name mysql `
    -e MYSQL_DATABASE=test `
    -e MYSQL_ROOT_PASSWORD=123456 `
    -p 3306:3306 --rm -d -v ${PWD}/temp/:/var/lib/mysql `
    --net net `
    mysql:8.3