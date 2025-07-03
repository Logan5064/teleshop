#!/usr/bin/env python3
"""
🧪 Super Simple Test Server
Простейший HTTP сервер для тестирования API
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import urllib.parse
from datetime import datetime

class TestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                "status": "healthy",
                "timestamp": datetime.now().isoformat(),
                "database": "test",
                "message": "Simple test server working!"
            }
            self.wfile.write(json.dumps(response).encode())
            
        elif self.path == '/api/stats':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                "total_designs": 5,
                "published_designs": 2,
                "total_templates": 3,
                "api_version": "test-1.0.0"
            }
            self.wfile.write(json.dumps(response).encode())
            
        else:
            self.send_response(404)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def do_POST(self):
        if self.path == '/api/designs':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode())
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                response = {
                    "id": 123,
                    "name": data.get('name', 'Test Design'),
                    "telegram_id": data.get('telegram_id', 'test_user'),
                    "blocks_count": len(data.get('blocks', [])),
                    "status": "created",
                    "message": "Дизайн успешно сохранен (тест)"
                }
                self.wfile.write(json.dumps(response).encode())
                
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def run_server():
    server_address = ('', 8001)
    httpd = HTTPServer(server_address, TestHandler)
    
    print("🧪 Starting Super Simple Test Server...")
    print("📍 Port: 8001")
    print("🔗 Health: http://localhost:8001/health")
    print("📊 Stats: http://localhost:8001/api/stats")
    print("💾 Designs: POST http://localhost:8001/api/designs")
    print("-" * 50)
    print("✅ Server ready! Press Ctrl+C to stop")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")
        httpd.shutdown()

if __name__ == "__main__":
    run_server() 