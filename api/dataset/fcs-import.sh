mongo test --eval "db.dropDatabase()"

ls -1 *.json | sed 's/.json$//' | while read col; do
    mongoimport -d test -c $col --jsonArray < $col.json; 
done
