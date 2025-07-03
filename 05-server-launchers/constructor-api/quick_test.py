#!/usr/bin/env python3
"""
⚡ Quick Test Server
Быстрый тест API на порту 8002
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from datetime import datetime

class QuickHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        print(f"📨 GET request: {self.path}")
        
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        if self.path == '/health':
            response = {
                "status": "healthy",
                "timestamp": datetime.now().isoformat(),
                "port": 8002,
                "message": "Quick test server OK!"
            }
        elif self.path == '/api/stats':
            response = {
                "total_designs": 10,
                "published_designs": 5,
                "api_version": "quick-test"
            }
        else:
            response = {"message": "Quick test server working", "path": self.path}
        
        self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
    
    def do_POST(self):
        print(f"📨 POST request: {self.path}")
        
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length > 0:
            post_data = self.rfile.read(content_length)
            print(f"📦 Data: {post_data[:100]}...")
        
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response = {
            "id": 999,
            "message": "Design saved successfully (quick test)",
            "status": "success"
        }
        
        self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def log_message(self, format, *args):
        print(f"🌐 {format % args}")

if __name__ == "__main__":
    server_address = ('', 8002)
    httpd = HTTPServer(server_address, QuickHandler)
    
    print("⚡ Quick Test Server")
    print("📍 Port: 8002")
    print("🔗 Test: http://localhost:8002/health")
    print("-" * 30)
    
    try:
        print("✅ Server starting...")
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        httpd.shutdown() 