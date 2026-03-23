#!/bin/bash

# Calendario Productivo - Iniciador para Linux Mint / Ubuntu
# Este script funciona en cualquier PC con Python instalado

clear
echo "════════════════════════════════════════════════════════"
echo "  📅 CALENDARIO PRODUCTIVO v2.0"
echo "════════════════════════════════════════════════════════"
echo ""

# Detectar directorio del script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Verificar si existe la carpeta dist
if [ ! -d "dist" ]; then
    echo "❌ Error: No se encuentra la carpeta 'dist'"
    echo "   Asegúrate de estar en la carpeta correcta"
    exit 1
fi

# Función para iniciar servidor Python
start_python_server() {
    echo "🚀 Iniciando servidor..."
    echo ""
    
    cd dist
    
    # Detectar versión de Python
    if command -v python3 &> /dev/null; then
        PYTHON_CMD="python3"
    elif command -v python &> /dev/null; then
        PYTHON_CMD="python"
    else
        echo "❌ Error: Python no está instalado"
        echo ""
        echo "Para instalar Python en Linux Mint/Ubuntu:"
        echo "   sudo apt update"
        echo "   sudo apt install python3"
        exit 1
    fi
    
    PORT=8000
    
    echo "✅ Servidor iniciado correctamente"
    echo ""
    echo "📍 URL: http://localhost:$PORT"
    echo ""
    echo "🌐 Abre tu navegador y ve a: http://localhost:$PORT"
    echo ""
    echo "⚠️  Para detener el servidor, presiona Ctrl+C"
    echo ""
    echo "════════════════════════════════════════════════════════"
    echo ""
    
    # Intentar abrir el navegador automáticamente
    if command -v xdg-open &> /dev/null; then
        sleep 2
        xdg-open "http://localhost:$PORT" 2>/dev/null &
    fi
    
    # Iniciar servidor
    $PYTHON_CMD -m http.server $PORT
}

# Función para iniciar con npm (si está disponible)
start_npm_server() {
    echo "🚀 Iniciando con npm..."
    echo ""
    
    if [ ! -d "node_modules" ]; then
        echo "📦 Instalando dependencias (solo la primera vez)..."
        npm install
        echo ""
    fi
    
    echo "✅ Abriendo calendario..."
    echo ""
    echo "📍 URL: http://localhost:5173"
    echo ""
    
    npm run dev
}

# Menú de opciones
echo "Selecciona cómo quieres iniciar el calendario:"
echo ""
echo "  1) Usar Python (Recomendado - No requiere instalación)"
echo "  2) Usar npm (Requiere Node.js instalado)"
echo ""
read -p "Opción [1-2]: " option

case $option in
    1)
        start_python_server
        ;;
    2)
        if command -v npm &> /dev/null; then
            start_npm_server
        else
            echo ""
            echo "❌ npm no está instalado"
            echo ""
            echo "Para instalar Node.js en Linux Mint/Ubuntu:"
            echo "   sudo apt update"
            echo "   sudo apt install nodejs npm"
            echo ""
            read -p "¿Quieres usar Python en su lugar? [s/n]: " use_python
            if [ "$use_python" = "s" ] || [ "$use_python" = "S" ]; then
                start_python_server
            fi
        fi
        ;;
    *)
        echo ""
        echo "Opción inválida. Usando Python por defecto..."
        sleep 2
        start_python_server
        ;;
esac
