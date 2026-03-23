#!/bin/bash

# Script para subir el calendario a GitHub
# Asegúrate de haber creado el repositorio en GitHub primero

clear
echo "════════════════════════════════════════════════════════"
echo "  🚀 SUBIR CALENDARIO A GITHUB"
echo "════════════════════════════════════════════════════════"
echo ""

# Verificar si git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git no está instalado"
    echo ""
    echo "Instala Git desde: https://git-scm.com/downloads"
    exit 1
fi

# Pedir nombre de usuario de GitHub
read -p "📝 Tu nombre de usuario de GitHub: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "❌ Debes ingresar un nombre de usuario"
    exit 1
fi

echo ""
echo "✅ Usaré: https://github.com/$GITHUB_USER/calendario-productivo"
echo ""
read -p "¿Es correcto? (s/n): " confirm

if [ "$confirm" != "s" ] && [ "$confirm" != "S" ]; then
    echo "❌ Cancelado"
    exit 1
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo "  📦 Preparando proyecto..."
echo "════════════════════════════════════════════════════════"
echo ""

# Verificar si ya existe .git
if [ -d ".git" ]; then
    echo "⚠️  Ya existe un repositorio Git"
    read -p "¿Quieres reiniciar desde cero? (s/n): " reset
    if [ "$reset" = "s" ] || [ "$reset" = "S" ]; then
        rm -rf .git
        echo "✅ Repositorio reiniciado"
    fi
fi

# Inicializar Git
if [ ! -d ".git" ]; then
    echo "🔧 Inicializando repositorio..."
    git init
    echo "✅ Repositorio inicializado"
fi

# Agregar archivos
echo ""
echo "📁 Agregando archivos..."
git add .

# Commit
echo ""
echo "💾 Creando commit..."
git commit -m "🎉 Calendario Productivo v3.0 - Primera versión"

# Agregar remote
echo ""
echo "🔗 Conectando con GitHub..."
git remote remove origin 2>/dev/null  # Remover si existe
git remote add origin "https://github.com/$GITHUB_USER/calendario-productivo.git"

# Crear rama main
echo ""
echo "🌿 Creando rama principal..."
git branch -M main

# Push
echo ""
echo "════════════════════════════════════════════════════════"
echo "  ⬆️  SUBIENDO A GITHUB..."
echo "════════════════════════════════════════════════════════"
echo ""
echo "⚠️  IMPORTANTE:"
echo "   Si te pide contraseña, usa un Personal Access Token"
echo "   NO uses tu contraseña de GitHub normal"
echo ""
echo "   Cómo crear un token:"
echo "   1. GitHub → Settings → Developer settings"
echo "   2. Personal access tokens → Tokens (classic)"
echo "   3. Generate new token → Dar permisos 'repo'"
echo "   4. Copiar el token y usarlo como contraseña"
echo ""
read -p "Presiona Enter para continuar..."

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "════════════════════════════════════════════════════════"
    echo "  ✅ ¡ÉXITO! Proyecto subido a GitHub"
    echo "════════════════════════════════════════════════════════"
    echo ""
    echo "📋 PRÓXIMOS PASOS:"
    echo ""
    echo "1. Ve a: https://github.com/$GITHUB_USER/calendario-productivo"
    echo ""
    echo "2. Click en 'Settings' (arriba)"
    echo ""
    echo "3. En el menú izquierdo → 'Pages'"
    echo ""
    echo "4. En 'Source' → Deploy from a branch"
    echo ""
    echo "5. En 'Branch':"
    echo "   - Selecciona: main"
    echo "   - Selecciona: /dist  ← ¡IMPORTANTE!"
    echo "   - Click en 'Save'"
    echo ""
    echo "6. Espera 2 minutos y tu calendario estará en:"
    echo "   🌐 https://$GITHUB_USER.github.io/calendario-productivo/"
    echo ""
    echo "════════════════════════════════════════════════════════"
else
    echo ""
    echo "❌ Hubo un error al subir"
    echo ""
    echo "Posibles soluciones:"
    echo "1. Verifica que el repositorio existe en GitHub"
    echo "2. Verifica tu nombre de usuario: $GITHUB_USER"
    echo "3. Usa un Personal Access Token como contraseña"
    echo "4. Revisa que tengas permisos de escritura"
    echo ""
fi
