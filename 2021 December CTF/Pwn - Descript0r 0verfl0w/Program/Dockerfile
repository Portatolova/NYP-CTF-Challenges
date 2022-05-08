#
#   Dockerfile for Descript0r 0verfl0w for December CTF
#   
#   Creator: Carl Voller
#

FROM python:3.9-slim

WORKDIR /app

RUN apt-get update
RUN apt-get install -y gcc make
COPY bin /app
RUN make

ENV PORT 8000
CMD ["./Descript0rManager"]