#!/bin/bash

# Script para crear paquete portable del Calendario Productivo

echo "📦 Creando paquete portable..."
echo ""

# Crear directorio temporal
mkdir -p calendario-portable

# Copiar solo lo esencial
cp -r dist calendario-portable/
cp iniciar-linux.sh calendario-portable/
cp servidor.py calendario-portable/
cp iniciar.bat calendario-portable/
cp LINUX_MINT_GUIA.md calendario-portable/README.md
cp NUEVAS_FUNCIONALIDADES.md calendario-portable/
cp COMO_EJECUTAR.md calendario-portable/

# Dar permisos
chmod +x calendario-portable/iniciar-linux.sh
chmod +x calendario-portable/servidor.py

# Crear archivo de instrucciones rápidas
cat > calendario-portable/INICIO_RAPIDO.txt << 'EOF'
═══════════════════════════════════════════════════════════
  📅 CALENDARIO PRODUCTIVO v2.0 - INICIO RÁPIDO
═══════════════════════════════════════════════════════════

🪟 WINDOWS:
  1. Abre CMD (Win + R, escribe cmd)
  2. cd ruta\a\calendario-portable
  3. iniciar.bat

🐧 LINUX / MAC:
  1. Abre Terminal
  2. cd /ruta/a/calendario-portable
  3. chmod +x iniciar-linux.sh
  4. ./iniciar-linux.sh

🐍 PYTHON (Cualquier Sistema):
  1. cd calendario-portable
  2. python3 servidor.py
  3. Abre: http://localhost:8000

📂 ARCHIVOS IMPORTANTES:
  • README.md - Guía completa para Linux
  • COMO_EJECUTAR.md - Todas las opciones
  • NUEVAS_FUNCIONALIDADES.md - Qué hay de nuevo

💾 PORTABLE:
  ✅ Copia esta carpeta a USB/otro PC
  ✅ No requiere instalación
  ✅ Solo necesita Python (ya viene en Linux)

═══════════════════════════════════════════════════════════
EOF

# Crear archivo .zip
echo "Comprimiendo..."
zip -r calendario-portable.zip calendario-portable/ -q

# Crear .tar.gz para Linux
echo "Creando versión .tar.gz para Linux..."
tar -czf calendario-portable.tar.gz calendario-portable/

# Limpiar
rm -rf calendario-portable

echo ""
echo "✅ ¡Listo!"
echo ""
echo "Archivos creados:"
echo "  📦 calendario-portable.zip (para Windows/cualquiera)"
echo "  📦 calendario-portable.tar.gz (optimizado para Linux)"
echo ""
echo "Tamaño: ~500 KB (muy ligero)"
echo ""
echo "Para usar:"
echo "  • Windows: Descomprime .zip y ejecuta iniciar.bat"
echo "  • Linux: tar -xzf calendario-portable.tar.gz && cd calendario-portable && ./iniciar-linux.sh"
