
FROM ubuntu:20.04
RUN apt-get update
ENV TZ=Asia/Singapore
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN ln -s /bin/true /bin/systemctl
RUN apt-get install -y socat build-essential software-properties-common
RUN add-apt-repository ppa:plt/racket
RUN apt-get update
RUN apt-get install -y racket
RUN raco pkg install --auto http-easy
RUN raco pkg install --auto jni

COPY notes.txt /flag
COPY project /encryptor

CMD ["socat", "TCP4-LISTEN:8014,fork", "EXEC:'/bin/racket',pty,stderr"]
