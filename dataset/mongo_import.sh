#! /bin/bash

HOST="${1:-27017}"

cd "$(dirname "${BASH_SOURCE[0]}")"
mongo localhost:$HOST/fcs --eval "db.dropDatabase()"
mongoimport -h localhost:$HOST -d fcs -c Task --jsonArray < Task.json
mongoimport -h localhost:$HOST -d fcs -c Team --jsonArray < Team.json
mongoimport -h localhost:$HOST -d fcs -c User --jsonArray < User.json

