@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

cls
echo ════════════════════════════════════════════════════════
echo   🚀 SUBIR CALENDARIO A GITHUB
echo ════════════════════════════════════════════════════════
echo.

REM Verificar si git está instalado
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Git no está instalado
    echo.
    echo Instala Git desde: https://git-scm.com/downloads
    pause
    exit /b 1
)

REM Pedir nombre de usuario
set /p GITHUB_USER="📝 Tu nombre de usuario de GitHub: "

if "!GITHUB_USER!"=="" (
    echo ❌ Debes ingresar un nombre de usuario
    pause
    exit /b 1
)

echo.
echo ✅ Usaré: https://github.com/!GITHUB_USER!/calendario-productivo
echo.
set /p confirm="¿Es correcto? (s/n): "

if /i not "!confirm!"=="s" (
    echo ❌ Cancelado
    pause
    exit /b 1
)

echo.
echo ════════════════════════════════════════════════════════
echo   📦 Preparando proyecto...
echo ════════════════════════════════════════════════════════
echo.

REM Verificar si ya existe .git
if exist ".git" (
    echo ⚠️  Ya existe un repositorio Git
    set /p reset="¿Quieres reiniciar desde cero? (s/n): "
    if /i "!reset!"=="s" (
        rmdir /s /q .git
        echo ✅ Repositorio reiniciado
    )
)

REM Inicializar Git
if not exist ".git" (
    echo 🔧 Inicializando repositorio...
    git init
    echo ✅ Repositorio inicializado
)

REM Agregar archivos
echo.
echo 📁 Agregando archivos...
git add .

REM Commit
echo.
echo 💾 Creando commit...
git commit -m "🎉 Calendario Productivo v3.0 - Primera versión"

REM Agregar remote
echo.
echo 🔗 Conectando con GitHub...
git remote remove origin 2>nul
git remote add origin "https://github.com/!GITHUB_USER!/calendario-productivo.git"

REM Crear rama main
echo.
echo 🌿 Creando rama principal...
git branch -M main

REM Push
echo.
echo ════════════════════════════════════════════════════════
echo   ⬆️  SUBIENDO A GITHUB...
echo ════════════════════════════════════════════════════════
echo.
echo ⚠️  IMPORTANTE:
echo    Si te pide contraseña, usa un Personal Access Token
echo    NO uses tu contraseña de GitHub normal
echo.
echo    Cómo crear un token:
echo    1. GitHub → Settings → Developer settings
echo    2. Personal access tokens → Tokens (classic)
echo    3. Generate new token → Dar permisos 'repo'
echo    4. Copiar el token y usarlo como contraseña
echo.
pause

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ════════════════════════════════════════════════════════
    echo   ✅ ¡ÉXITO! Proyecto subido a GitHub
    echo ════════════════════════════════════════════════════════
    echo.
    echo 📋 PRÓXIMOS PASOS:
    echo.
    echo 1. Ve a: https://github.com/!GITHUB_USER!/calendario-productivo
    echo.
    echo 2. Click en 'Settings' (arriba^)
    echo.
    echo 3. En el menú izquierdo → 'Pages'
    echo.
    echo 4. En 'Source' → Deploy from a branch
    echo.
    echo 5. En 'Branch':
    echo    - Selecciona: main
    echo    - Selecciona: /dist  ← ¡IMPORTANTE!
    echo    - Click en 'Save'
    echo.
    echo 6. Espera 2 minutos y tu calendario estará en:
    echo    🌐 https://!GITHUB_USER!.github.io/calendario-productivo/
    echo.
    echo ════════════════════════════════════════════════════════
) else (
    echo.
    echo ❌ Hubo un error al subir
    echo.
    echo Posibles soluciones:
    echo 1. Verifica que el repositorio existe en GitHub
    echo 2. Verifica tu nombre de usuario: !GITHUB_USER!
    echo 3. Usa un Personal Access Token como contraseña
    echo 4. Revisa que tengas permisos de escritura
    echo.
)

pause
