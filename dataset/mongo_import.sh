#! /bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"

mongo localhost:27018/fcs --eval "db.dropDatabase()"
mongoimport -h localhost:27018 -d fcs -c Task --jsonArray < Task.json
mongoimport -h localhost:27018 -d fcs -c Team --jsonArray < Team.json
mongoimport -h localhost:27018 -d fcs -c User --jsonArray < User.json

