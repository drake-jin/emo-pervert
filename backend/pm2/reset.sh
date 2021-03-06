
echo " ======== Start ======== [Step: 1] Deleting DynamoDB ======= Start ========="
node ./pm2/dynamo-initialize.js
echo " ======== End ======== [Step: 1] Deleting DynamoDB ======= End ========="

echo " ======== Start ======== [Step: 2] Dodcker Stop ======= Start ========="
docker-compose stop
echo " ======== End ======== [Step: 2] Dodcker Stop ======= End ========="

echo " ======== Start ======== [Step: 3] Stop Offline Service ======= Start ========="
pm2 kill
echo " ======== End ======== [Step: 3] Stop Offline Service ======= End ========="
