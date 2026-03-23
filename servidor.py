#!/usr/bin/env python3
"""
Servidor simple para ejecutar el calendario productivo compilado
"""

import http.server
import socketserver
import os
import sys

# Cambiar al directorio dist
os.chdir('dist')

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Agregar headers CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

Handler = MyHTTPRequestHandler

print("=" * 60)
print(" 🗓️  CALENDARIO PRODUCTIVO - SERVIDOR INICIADO")
print("=" * 60)
print(f"\n✅ Servidor corriendo en: http://localhost:{PORT}")
print(f"📂 Sirviendo archivos desde: {os.getcwd()}")
print("\n📌 Abre tu navegador y ve a: http://localhost:8000")
print("\n⚠️  Presiona Ctrl+C para detener el servidor\n")
print("=" * 60)

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n\n👋 Servidor detenido. ¡Hasta pronto!")
    sys.exit(0)
