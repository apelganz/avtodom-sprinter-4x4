"""Локальный сервер для работы над сайтом.

Отдаёт папку проекта как статику и подмешивает в index.html скрипт
комментариев (dev/comments.js). Сам index.html на диске не меняется.
Комментарии хранятся в dev/comments.json.

Запуск из корня проекта:  python3 dev/server.py [порт]
"""
import json
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STORE = ROOT / "dev" / "comments.json"
INJECT = b'<script src="/dev/comments.js"></script>'


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _send(self, code, body, ctype):
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = self.path.split("?")[0]
        if path in ("/", "/index.html"):
            html = (ROOT / "index.html").read_bytes()
            i = html.rfind(b"</body>")
            html = html[:i] + INJECT + html[i:] if i != -1 else html + INJECT
            return self._send(200, html, "text/html; charset=utf-8")
        if path == "/dev/comments.json":
            data = STORE.read_bytes() if STORE.exists() else b"[]"
            return self._send(200, data, "application/json; charset=utf-8")
        return super().do_GET()

    def do_POST(self):
        if self.path.split("?")[0] != "/dev/comments.json":
            return self._send(404, b"not found", "text/plain")
        body = self.rfile.read(int(self.headers.get("Content-Length", 0)))
        try:
            data = json.loads(body)
            if not isinstance(data, list):
                raise ValueError
        except ValueError:
            return self._send(400, b"bad json", "text/plain")
        tmp = STORE.with_suffix(".tmp")
        tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        os.replace(tmp, STORE)
        return self._send(200, b'{"ok":true}', "application/json")

    def log_message(self, fmt, *args):
        if self.command == "POST" or not str(args[1] if len(args) > 1 else "").startswith(("2", "3")):
            super().log_message(fmt, *args)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f"http://localhost:{port}  (комментарии: {STORE.relative_to(ROOT)})", flush=True)
    ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
