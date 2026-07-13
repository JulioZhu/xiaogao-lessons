#!/usr/bin/env python3
import http.server
import socketserver
import os

os.chdir("/opt/data/workspace/科学教学/小高备考/lessons/")
handler = http.server.SimpleHTTPRequestHandler
handler.extensions_map = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
}

with socketserver.TCPServer(("0.0.0.0", 8080), handler) as httpd:
    print(f"Serving lessons on port 8080")
    httpd.serve_forever()
