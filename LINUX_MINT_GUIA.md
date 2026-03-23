# 🐧 Calendario Productivo - Guía para Linux Mint

## 🚀 INICIO RÁPIDO

### Método 1: Un Solo Comando (Más Fácil)

1. Abre una Terminal (Ctrl + Alt + T)
2. Ve a la carpeta donde descargaste el calendario:
   ```bash
   cd ~/Descargas/calendario-mejorado/app
   ```
3. Ejecuta:
   ```bash
   chmod +x iniciar-linux.sh && ./iniciar-linux.sh
   ```
4. Selecciona la opción **1** (Python)
5. ¡Listo! Se abrirá en tu navegador

---

## 📦 HACER EL CALENDARIO PORTABLE

### Para copiar a otro PC o USB:

Sólo necesitas copiar la carpeta **`dist`** y el archivo **`iniciar-linux.sh`**. Eso es todo.

```bash
# Copiar a USB (ejemplo)
cp -r dist /media/tuusuario/USB/calendario/
cp iniciar-linux.sh /media/tuusuario/USB/calendario/

# Luego en el otro PC:
cd /media/tuusuario/USB/calendario/
chmod +x iniciar-linux.sh
./iniciar-linux.sh
```

### Crear un paquete portable:

```bash
# Desde la carpeta app
tar -czf calendario-portable.tar.gz dist/ iniciar-linux.sh

# Para extraer en otro PC:
tar -xzf calendario-portable.tar.gz
cd dist
chmod +x ../iniciar-linux.sh
../iniciar-linux.sh
```

---

## 🔧 INSTALACIÓN DE DEPENDENCIAS (Si es necesario)

### Python (Recomendado - Probablemente ya lo tienes)

```bash
sudo apt update
sudo apt install python3
```

### Node.js (Opcional - Solo si quieres modo desarrollo)

```bash
sudo apt update
sudo apt install nodejs npm
```

---

## 🎯 MÉTODOS DE EJECUCIÓN

### Opción A: Script automático
```bash
./iniciar-linux.sh
```

### Opción B: Python directo (Más rápido)
```bash
cd dist
python3 -m http.server 8000
# Abre: http://localhost:8000
```

### Opción C: Con npm (Modo desarrollo)
```bash
npm install
npm run dev
# Abre: http://localhost:5173
```

---

## 📂 ESTRUCTURA PORTABLE MÍNIMA

Para que funcione en cualquier PC Linux, solo necesitas:

```
calendario/
├── dist/                    ← Archivos compilados
│   ├── index.html
│   └── assets/
└── iniciar-linux.sh         ← Script de inicio
```

**Tamaño total: ~470 KB** (muy ligero)

---

## 🔐 PERMISOS

Si al ejecutar el script te sale error de permisos:

```bash
chmod +x iniciar-linux.sh
```

O ejecuta con bash:

```bash
bash iniciar-linux.sh
```

---

## 💾 DATOS DEL CALENDARIO

Todos tus datos se guardan en el **localStorage** del navegador. Esto significa:

✅ **Ventaja**: No necesitas base de datos ni servidor
❌ **Importante**: Los datos están en TU navegador en TU PC

### Para respaldar tus datos:

Los datos están en el navegador. Para exportar/importar entre PCs, puedes:

1. **Copiar localStorage manualmente**:
   - Abre el calendario
   - Presiona F12 → Console
   - Ejecuta:
   ```javascript
   // Exportar
   const datos = {
     tasks: localStorage.getItem('calendar_tasks'),
     subjects: localStorage.getItem('calendar_study_subjects'),
     schedule: localStorage.getItem('calendar_study_schedule'),
     summaries: localStorage.getItem('calendar_day_summaries'),
     reminders: localStorage.getItem('calendar_reminders'),
     flowcharts: localStorage.getItem('calendar_flowcharts')
   };
   console.log(JSON.stringify(datos));
   // Copia el resultado
   ```

2. **En el otro PC**:
   ```javascript
   // Importar (pega tus datos en lugar de {...})
   const datos = {...};
   localStorage.setItem('calendar_tasks', datos.tasks);
   localStorage.setItem('calendar_study_subjects', datos.subjects);
   localStorage.setItem('calendar_study_schedule', datos.schedule);
   localStorage.setItem('calendar_day_summaries', datos.summaries);
   localStorage.setItem('calendar_reminders', datos.reminders);
   localStorage.setItem('calendar_flowcharts', datos.flowcharts);
   location.reload();
   ```

---

## 🌐 ACCESO DESDE OTROS DISPOSITIVOS EN LA RED

Para abrir el calendario desde tu móvil u otro PC en la misma red WiFi:

1. Encuentra tu IP local:
   ```bash
   hostname -I
   ```
   Ejemplo: `192.168.1.100`

2. Inicia el servidor:
   ```bash
   cd dist
   python3 -m http.server 8000
   ```

3. En el otro dispositivo, abre:
   ```
   http://192.168.1.100:8000
   ```

---

## ❓ SOLUCIÓN DE PROBLEMAS

### "Permission denied"
```bash
chmod +x iniciar-linux.sh
```

### "Python not found"
```bash
sudo apt install python3
```

### "El navegador no abre automáticamente"
Abre manualmente: **http://localhost:8000**

### "Puerto 8000 ocupado"
```bash
# Usa otro puerto
python3 -m http.server 8080
```

### "No se ven los datos después de copiar"
Los datos están en el navegador, no en los archivos. Usa el método de exportar/importar localStorage de arriba.

---

## 🎨 PERSONALIZAR EL LAUNCHER

Para crear un acceso directo en el escritorio:

1. Crea el archivo:
   ```bash
   nano ~/Escritorio/calendario.desktop
   ```

2. Pega esto (cambia la ruta):
   ```ini
   [Desktop Entry]
   Version=1.0
   Type=Application
   Name=Calendario Productivo
   Comment=Mi calendario personal
   Exec=bash /ruta/a/calendario/iniciar-linux.sh
   Icon=calendar
   Terminal=true
   Categories=Utility;
   ```

3. Dale permisos:
   ```bash
   chmod +x ~/Escritorio/calendario.desktop
   ```

¡Ahora puedes hacer doble click en el ícono!

---

## 🔄 ACTUALIZAR A UNA NUEVA VERSIÓN

1. **Respalda tus datos** (método localStorage de arriba)
2. Descarga la nueva versión
3. Copia la nueva carpeta `dist`
4. **Restaura tus datos** en el navegador

---

## ✅ CHECKLIST DE PORTABILIDAD

- [ ] Python 3 instalado (viene por defecto en Linux Mint)
- [ ] Script tiene permisos de ejecución
- [ ] Carpeta `dist` completa
- [ ] Datos respaldados (si quieres moverlos entre PCs)

---

## 📞 COMANDOS ÚTILES

```bash
# Ver si Python está instalado
python3 --version

# Ver si npm está instalado
npm --version

# Ver procesos en el puerto 8000
lsof -i :8000

# Matar proceso en puerto 8000
kill -9 $(lsof -t -i:8000)

# Hacer respaldo de datos del navegador
# (No hay comando - usa el método JavaScript de arriba)
```

---

## 🎉 ¡ESO ES TODO!

El calendario es **100% portable** y funciona en cualquier Linux Mint/Ubuntu con Python instalado (que viene por defecto).

**¿Necesitas ayuda?** Revisa los archivos:
- `COMO_EJECUTAR.md` - Guía general
- `NUEVAS_FUNCIONALIDADES.md` - Características
- `CAMBIOS_TECNICOS.md` - Info técnica
