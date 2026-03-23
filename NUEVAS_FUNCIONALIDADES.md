# Calendario Productivo - Versión Mejorada 🗓️✨

## 🆕 Nuevas Funcionalidades Agregadas

### 1. 📌 Recordatorios
- **Ubicación**: Esquina superior derecha de cada día
- **Ícono**: 🔔 Campana naranja
- **Cómo usar**:
  - Pasa el mouse sobre el ícono de campana para ver el recordatorio
  - Click en la campana (o botón flotante) para agregar/editar
  - Máximo 50 caracteres
  - Perfecto para eventos importantes que no quieres olvidar

### 2. ⚫ Auto-Negro (0%)
- **Funcionamiento**: Si un día pasa y NO marcas tus hábitos antes de las 12:00 AM, automáticamente se marca como negro (0%)
- **Propósito**: Te motiva a registrar tus hábitos diariamente
- **Nota**: El sistema revisa automáticamente cada hora para marcar días pasados

### 3. 🔀 Flujogramas
- **Acceso**: Click en el botón flotante con ícono de red (Network) en cada día
- **Funcionalidad**: Crea diagramas de flujo para organizar tus tareas del día
- **Cómo usar**:
  1. Escribe el texto del nodo y presiona "Nodo"
  2. Click en un nodo para seleccionarlo (se pone azul)
  3. Presiona "Conectar" y luego click en otro nodo para crear una flecha
  4. Puedes eliminar nodos y conexiones con el botón X rojo
- **Guarda automáticamente** al cerrar el modal

### 4. ⭐ Estrella de 100%
- **Cuando aparece**: Si completas el día con un 100% de hábitos cumplidos
- **Ubicación**: Esquina superior izquierda del día
- **Significado**: ¡Día perfecto! 🎉

## 📋 Resumen de Características Completas

### Trabajos (Azul) 💼
- Crear tareas con materia, actividad, fecha límite
- Prioridad: Bajo, Medio, Alto
- Marcar como completada
- Días restantes calculados automáticamente

### Estudio (Rojo #F54927) 📚
- Define hasta 7 materias con jerarquía:
  - ♠ Picas (Alta): 2 materias - estudio diario
  - ♣ Tréboles (Media): 2 materias - día de por medio
  - ♥ Corazones (Baja): 3 materias - una vez por semana
- Distribución automática de horarios de estudio
- Bloques de tiempo configurados

### Hábitos Diarios 🎯
6 hábitos a seguir:
- 🛏️ Salud de sueño
- 📖 Estudio
- 🪶 Anki
- 📚 Lectura
- 🧴 Cuidado personal
- 🎸 Guitarra

**Código de colores** según % completado:
- Morado: 100%
- Azul: 85%
- Cian: 67%
- Verde: 50%
- Naranja: 33%
- Rojo: 17%
- Negro: 0%

## 🚀 Instalación y Uso

### Opción 1: Usar la versión compilada (Más fácil)
1. Abre la carpeta `dist`
2. Abre el archivo `index.html` en tu navegador
3. ¡Listo! El calendario está funcionando

### Opción 2: Modo desarrollo (Para programadores)
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 🎮 Controles del Calendario

### Click en un día:
- **Click normal**: Abre el modal de hábitos
- **Botones flotantes** (aparecen al pasar el mouse):
  - 🔔 Recordatorio
  - 🔀 Flujograma

### Botones superiores:
- **Trabajos**: Gestionar tareas pendientes
- **Estudio**: Configurar materias y horarios
- **🔄 Reset**: Borrar todos los datos (usa con precaución)

## 💾 Almacenamiento

Todos los datos se guardan en `localStorage` de tu navegador:
- Tareas
- Materias de estudio
- Resúmenes diarios
- **Recordatorios** (nuevo)
- **Flujogramas** (nuevo)

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (últimas versiones)
- ✅ Responsive (funciona en móvil y tablet)
- ✅ Sin necesidad de servidor o internet

## 🔧 Tecnologías

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Lucide Icons

## 📝 Notas Importantes

1. **Auto-negro**: Los días se marcan automáticamente como negro si no registras hábitos
2. **Recordatorios**: Máximo 50 caracteres, visibles al pasar el mouse
3. **Flujogramas**: Persisten automáticamente, puedes editarlos cuando quieras
4. **Estrella**: Solo aparece cuando logras el 100% en un día
5. **Datos locales**: No se sincronizan entre dispositivos

## 🎨 Personalización

Puedes modificar:
- Colores en `src/types/index.ts`
- Bloques de estudio en `STUDY_BLOCKS`
- Componentes UI en `src/components/ui/`

## 🐛 Solución de Problemas

**¿Los datos no se guardan?**
- Verifica que las cookies/localStorage estén habilitados en tu navegador

**¿El auto-negro no funciona?**
- El sistema revisa cada hora. Espera un poco o recarga la página.

**¿Botones flotantes no aparecen?**
- Pasa el mouse sobre el día (en escritorio)
- En móvil, aparecen siempre visibles

---

**Versión**: 2.0
**Última actualización**: Marzo 2026
**Desarrollado con**: ❤️ y muchas líneas de código
