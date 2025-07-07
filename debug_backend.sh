#!/bin/bash

echo "🔍 TeleShop Backend Diagnostic Script"
echo "====================================="

echo ""
echo "📋 PM2 Status:"
pm2 status

echo ""
echo "📝 Backend Logs (last 50 lines):"
pm2 logs teleshop-backend --lines 50

echo ""
echo "🗃️ Database Connection Test:"
echo "Testing connection to PostgreSQL..."

# Check if backend server is accessible
echo ""
echo "🌐 Backend Port Check:"
curl -s http://localhost:8000/health || echo "❌ Backend not responding on port 8000"

echo ""
echo "📁 Backend Files Check:"
ls -la /opt/teleshop/05-server-launchers/main/

echo ""
echo "🐍 Python Dependencies:"
cd /opt/teleshop/05-server-launchers/main
source venv/bin/activate
pip list | grep -E "(fastapi|sqlalchemy|psycopg2|asyncpg)"

echo ""
echo "🔧 Backend Configuration:"
ls -la /opt/teleshop/05-server-launchers/main/*.py

echo ""
echo "📊 System Resources:"
free -h
df -h /opt/teleshop
ps aux | grep python

echo ""
echo "🔄 Restart Backend:"
echo "To restart backend: pm2 restart teleshop-backend"
echo "To view real-time logs: pm2 logs teleshop-backend" 