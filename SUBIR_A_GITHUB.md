# 🚀 GUÍA: Subir el Calendario a GitHub Pages

## 📋 Pasos para tener tu calendario en línea GRATIS

### Paso 1: Crear cuenta en GitHub (si no tienes)

1. Ve a https://github.com
2. Click en "Sign up"
3. Crea tu cuenta (es gratis)

---

### Paso 2: Crear un nuevo repositorio

1. En GitHub, click en el **+** (arriba derecha) → **New repository**
2. Nombre del repositorio: `calendario-productivo`
3. Descripción: "Mi calendario productivo personal"
4. **Público** (debe ser público para GitHub Pages gratis)
5. **NO** marques "Add a README" (ya lo tenemos)
6. Click en **Create repository**

---

### Paso 3: Preparar el proyecto localmente

Abre una terminal en la carpeta del proyecto:

#### En Windows (CMD o PowerShell):
```bash
cd C:\ruta\a\tu\calendario-mejorado\app
```

#### En Linux / Mac:
```bash
cd /ruta/a/tu/calendario-mejorado/app
```

---

### Paso 4: Inicializar Git y subir

Copia y pega estos comandos **UNO POR UNO**:

```bash
# 1. Inicializar repositorio
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer el primer commit
git commit -m "🎉 Primera versión del calendario productivo"

# 4. Conectar con tu repositorio de GitHub
# CAMBIA "TU-USUARIO" por tu nombre de usuario de GitHub
git remote add origin https://github.com/TU-USUARIO/calendario-productivo.git

# 5. Crear rama principal
git branch -M main

# 6. Subir todo a GitHub
git push -u origin main
```

**IMPORTANTE**: En el paso 4, reemplaza `TU-USUARIO` con tu nombre de usuario real de GitHub.

Si te pide usuario y contraseña:
- Usuario: tu nombre de usuario de GitHub
- Contraseña: usa un **Personal Access Token** (no tu contraseña normal)

#### Crear un Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Dale permisos: `repo` (marcar todo)
4. Copia el token y úsalo como contraseña

---

### Paso 5: Activar GitHub Pages

1. En tu repositorio de GitHub, ve a **Settings**
2. En el menú izquierdo, click en **Pages**
3. En "Source", selecciona: **Deploy from a branch**
4. En "Branch", selecciona:
   - Branch: **main**
   - Folder: **/dist** ← ¡MUY IMPORTANTE!
5. Click en **Save**

---

### Paso 6: Esperar y ¡Listo! 🎉

1. GitHub tardará 1-2 minutos en construir tu sitio
2. Refresca la página de Settings → Pages
3. Verás un mensaje verde: "Your site is live at https://TU-USUARIO.github.io/calendario-productivo/"
4. ¡Click en el link y ya está funcionando! 🎊

---

## 🔄 Actualizar el calendario después

Si haces cambios y quieres actualizar:

```bash
# 1. Recompilar (si modificaste código fuente)
npm run build

# 2. Agregar cambios
git add .

# 3. Commit con mensaje
git commit -m "Actualización: descripción de tus cambios"

# 4. Subir a GitHub
git push
```

Espera 1-2 minutos y los cambios estarán en línea.

---

## 💡 Compartir tu calendario

Tu calendario estará disponible en:
```
https://TU-USUARIO.github.io/calendario-productivo/
```

Puedes compartir este link con quien quieras. Cada persona tendrá sus propios datos (localStorage es local a cada navegador).

---

## 🔒 Datos y Privacidad

- ✅ Tus datos están en **TU** navegador (localStorage)
- ✅ NO se suben a GitHub
- ✅ NO se sincronizan entre dispositivos
- ✅ Cada persona tiene sus propios datos
- ✅ GitHub solo aloja el código, no tus datos

---

## 🎨 Personalizar la URL

Si quieres una URL más bonita:

### Opción 1: Usar tu dominio propio
1. Compra un dominio (ejemplo: tudominio.com)
2. En Settings → Pages → Custom domain
3. Escribe tu dominio y configura DNS

### Opción 2: Usar nombre de usuario
Si el repo se llama `TU-USUARIO.github.io`, la URL será más corta:
```
https://TU-USUARIO.github.io
```

---

## ❓ Solución de Problemas

### "Permission denied" al hacer push
- Usa un Personal Access Token como contraseña
- O configura SSH: https://docs.github.com/es/authentication/connecting-to-github-with-ssh

### La página muestra error 404
- Verifica que en Settings → Pages hayas seleccionado **/dist** como folder
- Espera 2-3 minutos, a veces tarda

### Los cambios no se ven
- Limpia caché del navegador (Ctrl + Shift + R)
- Espera 2-3 minutos después del push
- Verifica que hiciste `npm run build` antes de push

### "git: command not found"
- Instala Git: https://git-scm.com/downloads

---

## 📚 Recursos Útiles

- [Documentación GitHub Pages](https://pages.github.com/)
- [Guía Git básica](https://git-scm.com/book/es/v2)
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

---

## 🎯 Resumen Rápido

1. ✅ Crear cuenta en GitHub
2. ✅ Crear repositorio público `calendario-productivo`
3. ✅ Ejecutar comandos git en tu terminal
4. ✅ Activar GitHub Pages con folder `/dist`
5. ✅ Esperar 2 minutos
6. ✅ ¡Usar tu calendario en línea!

**URL final**: `https://TU-USUARIO.github.io/calendario-productivo/`

---

## 🆘 ¿Necesitas ayuda?

Si te trabas en algún paso:
1. Lee el mensaje de error completo
2. Búscalo en Google (casi siempre alguien ya lo resolvió)
3. Revisa la documentación de GitHub
4. Asegúrate de haber seguido TODOS los pasos

¡Éxito! 🚀
