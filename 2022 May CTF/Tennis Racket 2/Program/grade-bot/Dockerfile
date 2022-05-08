
FROM python:3.9-alpine3.14

WORKDIR /app
COPY app.py app.py
COPY flag flag

RUN pip install flask

CMD ["python", "app.py"]
