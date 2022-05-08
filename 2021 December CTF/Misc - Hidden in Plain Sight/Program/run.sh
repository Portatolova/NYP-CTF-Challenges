docker build -t hidden-in-plain-sight .
PORT="${1:-8000}"
docker run -d --rm -p "$PORT:8000" --restart=always -t hidden-in-plain-sight