echo " ======== Start ======== [Step: 1] Dodcker BUILD ======= Start ========="
docker-compose up --build -d
echo " ======== End ======== [Step: 1] Dodcker BUILD ======= End ========="


echo " ======== Start ======== [Step: 2] Migration DynamoDB ======= Start ========="
echo " Log: [2] Migrating file://`pwd`/dynamodb/migration.json"


node ./pm2/init.js

echo " ======== End ======== [Step: 2] Migration DynamoDB ======= End ========="


  