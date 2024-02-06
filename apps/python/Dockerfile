FROM python:alpine

WORKDIR /app

COPY ./start.py /app/start.py

SHELL ["/bin/sh", "-c"]

RUN pip install Flask
RUN pip install flask_cors 

EXPOSE 4100

ENTRYPOINT [ "python", "./start.py" ]