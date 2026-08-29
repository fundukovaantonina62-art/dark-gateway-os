#!/usr/bin/env python3
"""
Dark Gateway OS — Local Development Preview Server
Runs a hardened, zero-cache static web server for testing the website.
"""

import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Security & Zero-Cache Headers for local testing
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('Referrer-Policy', 'no-referrer')
        super().end_headers()

def run():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        print(f"==================================================")
        print(f"◈ Dark Gateway OS — Local Dev Server Online")
        print(f"◈ Serving: {DIRECTORY}")
        print(f"◈ Preview URL: http://127.0.0.1:{PORT}")
        print(f"==================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

if __name__ == "__main__":
    run()
