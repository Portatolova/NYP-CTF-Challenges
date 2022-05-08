
PORT="${1:-8000}"
docker run -d -p "$PORT:8000" --restart=always -t meet-greet0r