#
#   Dockerfile for Hidden in Plain Sight challenge for December CTF
#   
#   Creator: Carl Voller
#

# Please stick to alpine images and not slim images
FROM python:3.9-alpine

COPY hidden /bin/hidden
RUN chmod +x /bin/hidden

ENV PORT 8000
CMD ["hidden"]