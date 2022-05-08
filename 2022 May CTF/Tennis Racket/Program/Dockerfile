FROM ubuntu:20.04
ENV TZ=Asia/Singapore
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update
RUN apt-get install -y socat build-essential racket

COPY flag.txt /flag

CMD ["socat", "TCP4-LISTEN:8010,fork", "EXEC:/bin/racket"]
