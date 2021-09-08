ls -1 *.json | sed 's/.json$//' | while read col; do
    mongo test --eval "db.$col.drop()"; 
    mongoimport -d test -c $col --jsonArray < $col.json; 
done
