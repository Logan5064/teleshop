# TeleShop Deployment Script
Write-Host "🚀 Starting TeleShop Deployment..." -ForegroundColor Green

# SSH parameters
$ServerIP = "77.73.232.46"
$KeyFile = "teleshop-beget-key" 
$ServerPath = "/root/sitetest"

Write-Host "📡 Connecting to server $ServerIP..." -ForegroundColor Yellow

# Create deployment commands
$commands = @(
    "cd $ServerPath",
    "echo '📥 Pulling latest code...'",
    "git pull origin main",
    "echo '📦 Installing dashboard dependencies...'", 
    "cd 01-user-dashboard && npm install",
    "echo '🔨 Building dashboard...'",
    "npm run build",
    "cd ..",
    "echo '📦 Installing constructor dependencies...'",
    "cd offconstryktor && npm install", 
    "echo '🔨 Building constructor...'",
    "npm run build",
    "cd ..",
    "echo '🔄 Restarting PM2 services...'",
    "pm2 reload ecosystem.config.js --env production",
    "echo '✅ Deployment completed!'"
)

# Join commands with &&
$commandString = $commands -join " && "

# Execute SSH command
Write-Host "🔧 Executing deployment commands..." -ForegroundColor Blue
ssh -i $KeyFile -o StrictHostKeyChecking=no root@$ServerIP $commandString

Write-Host "🎉 Deployment script finished!" -ForegroundColor Green 