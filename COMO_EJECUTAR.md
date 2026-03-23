# 🚀 CÓMO EJECUTAR EL CALENDARIO PRODUCTIVO

## ⚡ OPCIÓN 1: UN SOLO CLICK (Recomendada)

### En Windows:
1. Abre la carpeta `app`
2. Haz **doble click** en `iniciar.bat`
3. ¡Listo! Se abrirá en http://localhost:5173

### En Mac/Linux:
1. Abre una terminal
2. Ve a la carpeta: `cd app`
3. Dale permisos: `chmod +x iniciar.sh`
4. Ejecuta: `./iniciar.sh`
5. ¡Listo! Se abrirá en http://localhost:5173

---

## 🐍 OPCIÓN 2: Usar Python (Sin instalar nada)

### Si tienes Python 3 instalado:

1. Abre una terminal/cmd
2. Ve a la carpeta `app`:
   ```bash
   cd app
   ```
3. Ejecuta:
   ```bash
   python3 servidor.py
   ```
   O en Windows:
   ```bash
   python servidor.py
   ```
4. Abre tu navegador en: **http://localhost:8000**

### Alternativa más simple con Python:
```bash
cd app/dist
python3 -m http.server 8000
```
Luego abre: **http://localhost:8000**

---

## 💻 OPCIÓN 3: Línea de comandos (Para desarrolladores)

### Primera vez:
```bash
cd app
npm install
npm run dev
```

### Siguientes veces:
```bash
cd app
npm run dev
```

Abre tu navegador en: **http://localhost:5173**

---

## 🌐 OPCIÓN 4: Extensión de VS Code (Si usas VS Code)

1. Instala la extensión **"Live Server"** en VS Code
2. Abre la carpeta `app/dist` en VS Code
3. Click derecho en `index.html`
4. Selecciona **"Open with Live Server"**
5. ¡Listo!

---

## ❓ SOLUCIÓN DE PROBLEMAS

### "npm no se reconoce como comando"
**Solución**: Necesitas instalar Node.js
- Ve a: https://nodejs.org
- Descarga e instala la versión LTS
- Reinicia tu computadora
- Vuelve a intentar

### "python no se reconoce como comando"
**Solución**: Necesitas instalar Python
- Ve a: https://www.python.org/downloads/
- Descarga e instala Python 3
- Durante la instalación, marca **"Add Python to PATH"**
- Reinicia tu computadora
- Vuelve a intentar

### La página aparece en blanco
**Solución**: 
1. Abre la consola del navegador (F12)
2. Revisa si hay errores
3. Asegúrate de estar usando un servidor (cualquiera de las opciones anteriores)
4. NO abras el archivo directamente con doble click

### El puerto está ocupado
**Solución**:
Si te dice que el puerto 5173 o 8000 está ocupado:
- Cierra otros servidores que tengas corriendo
- O cambia el puerto en el archivo:
  - Para Python: cambia `PORT = 8000` a otro número
  - Para npm: usa `npm run dev -- --port 3000`

---

## ✅ CHECKLIST RÁPIDO

Antes de empezar, verifica que tienes UNO de estos:

- [ ] Node.js instalado → Usa OPCIÓN 1 o 3
- [ ] Python instalado → Usa OPCIÓN 2  
- [ ] VS Code con Live Server → Usa OPCIÓN 4
- [ ] Ninguno de los anteriores → Instala Node.js o Python primero

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
app/
├── dist/              ← Versión compilada (lista para usar)
│   ├── index.html
│   └── assets/
├── src/               ← Código fuente
├── iniciar.bat        ← ✨ Script de inicio para Windows
├── iniciar.sh         ← ✨ Script de inicio para Mac/Linux
├── servidor.py        ← ✨ Servidor Python simple
└── package.json
```

---

## 🎯 RECOMENDACIÓN

**Si eres principiante**: 
1. Instala Python (es más simple)
2. Usa la OPCIÓN 2

**Si eres desarrollador**: 
1. Instala Node.js
2. Usa la OPCIÓN 1 o 3

**Si usas VS Code**: 
1. Usa la OPCIÓN 4

---

## 📞 NECESITAS MÁS AYUDA?

1. **Abre la GUIA_VISUAL.html** en tu navegador para ver cómo funcionan las nuevas características
2. **Lee NUEVAS_FUNCIONALIDADES.md** para la documentación completa
3. **Lee CAMBIOS_TECNICOS.md** si eres desarrollador

---

## 🎉 ¡ESO ES TODO!

Una vez que veas el calendario en tu navegador, ya puedes:
- ✅ Crear tareas
- ✅ Configurar materias de estudio
- ✅ Marcar hábitos diarios
- ✅ Agregar recordatorios 📌
- ✅ Crear flujogramas 🔀
- ✅ Ver tus días con 100% con estrella ⭐

**¡Disfruta tu calendario productivo!** 🗓️✨
