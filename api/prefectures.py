from http.server import BaseHTTPRequestHandler
import urllib.request
import os

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'

        req = urllib.request.Request(url)
        req.add_header('X-API-KEY',os.environ.get('RESAS_API_KEY'))
        with urllib.request.urlopen(req) as res:
            body = res.read()

        self.send_response(200)
        self.send_header('Content-type','application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(body)
        return
