#
#   Dockerfile for Framed Copy challenge for December CTF
#   
#   Creator: Carl Voller
#

# Please stick to alpine images and not slim images
FROM node:16-alpine3.12

WORKDIR /app
COPY app .
RUN npm i

CMD ["node", "index.js"]