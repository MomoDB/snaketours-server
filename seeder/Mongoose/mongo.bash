if [ $(mongo --eval 'db.getMongo().getDBNames().indexOf("tours")' --quiet) -lt 0 ]; then
  echo "tours doesn't exist"
  echo "creating new database..."
  mongoimport --db tours --collection tours --file /Users/joeynguyen/tripadvisor-itenerary-server/seeder/Mongoose/mongo_tours.csv --type csv --headerline
else
    echo "tours exists"
    mongo tours --eval "db.dropDatabase()"
    echo "database dropped"
    mongoimport --db tours --collection tours --file /Users/joeynguyen/tripadvisor-itenerary-server/seeder/Mongoose/mongo_tours.csv --type csv --headerline
fi