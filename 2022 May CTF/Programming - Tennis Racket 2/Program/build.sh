cd entry
docker build -t tennisracket2 . --platform=amd64
cd ../grade-bot
docker build -t tennisracket2-grade-bot . --platform=amd64