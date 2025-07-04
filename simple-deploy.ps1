Write-Host "Starting TeleShop deployment..." -ForegroundColor Green

# Simple deployment commands
$deployCommands = "cd /var/www/teleshop && git pull origin main && cd 01-user-dashboard && npm install && npm run build && cd ../offconstryktor && npm install && npm run build && cd .. && pm2 stop all && pm2 start ecosystem-server.config.js && pm2 status"

# Execute on server
ssh -i teleshop-beget-key cloud_user@77.73.232.46 $deployCommands

Write-Host "Deployment completed!" -ForegroundColor Green 