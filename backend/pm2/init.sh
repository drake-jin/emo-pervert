echo " ======== Start ======== [Step: 1] Dodcker BUILD ======= Start ========="
docker-compose up --build -d
echo " ======== End ======== [Step: 1] Dodcker BUILD ======= End ========="


echo " ======== Start ======== [Step: 2] Migration DynamoDB ======= Start ========="
node ./pm2/dynamo-initialize.js
echo " ======== End ======== [Step: 2] Migration DynamoDB ======= End ========="


  