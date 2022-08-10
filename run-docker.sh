#!/bin/sh
set -x

docker build . -t recognizer
docker rm recognizer_run
docker run -it -p 3000:3000 -v "`pwd`":/app --name recognizer_run recognizer $*
