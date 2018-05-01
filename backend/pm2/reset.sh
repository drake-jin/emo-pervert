
echo " ======== Start ======== [Step: 1] Deleting DynamoDB ======= Start ========="
echo " Log: [2] DELETE REWARD-TODO table"

aws dynamodb list-tables \
  --endpoint-url http://0.0.0.0:28000

aws dynamodb delete-table \
  --table-name 'REWARD-TODO' \
  --endpoint-url http://0.0.0.0:28000

echo " ======== End ======== [Step: 1] Deleting DynamoDB ======= End ========="

echo " ======== Start ======== [Step: 2] Dodcker Stop ======= Start ========="
docker-compose stop
echo " ======== End ======== [Step: 2] Dodcker Stop ======= End ========="



echo " ======== Start ======== [Step: 3] Stop Offline Service ======= Start ========="
pm2 kill
echo " ======== End ======== [Step: 3] Stop Offline Service ======= End ========="
