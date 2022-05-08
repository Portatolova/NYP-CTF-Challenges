
FROM ubuntu:20.04
RUN apt-get update
ENV TZ=Asia/Singapore
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN ln -s /bin/true /bin/systemctl
RUN apt-get install -y socat build-essential software-properties-common
RUN add-apt-repository ppa:plt/racket
RUN apt-get update
RUN apt-get install -y racket
RUN apt-get install -y curl iputils-ping
RUN raco pkg install --auto http-easy

COPY notes.txt /flag

CMD ["socat", "TCP4-LISTEN:8011,fork", "EXEC:'/bin/racket',pty,stderr"]
