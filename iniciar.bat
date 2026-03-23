@echo off
echo ====================================
echo  Calendario Productivo - Iniciando
echo ====================================
echo.
echo Instalando dependencias...
call npm install
echo.
echo Abriendo el calendario en tu navegador...
echo.
echo URL: http://localhost:5173
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
call npm run dev
pause
