# Resumen Técnico de Cambios

## Archivos Nuevos Creados

### 1. Hooks
- `src/hooks/useReminders.ts` - Gestión de recordatorios con localStorage
- `src/hooks/useFlowcharts.ts` - Gestión de flujogramas con localStorage

### 2. Componentes Modales
- `src/sections/ReminderModal.tsx` - Modal para crear/editar recordatorios
- `src/sections/FlowchartModal.tsx` - Modal interactivo para crear flujogramas

### 3. Documentación
- `NUEVAS_FUNCIONALIDADES.md` - Guía completa de las nuevas funcionalidades

## Archivos Modificados

### 1. `src/types/index.ts`
**Cambios**:
- Agregadas interfaces `Reminder`, `Flowchart`, `FlowchartNode`, `FlowchartConnection`
- Nuevos tipos para gestionar recordatorios y flujogramas

### 2. `src/hooks/useHabits.ts`
**Cambios**:
- Agregado efecto `useEffect` para auto-marcar días pasados como negro (0%)
- Sistema que revisa cada hora los últimos 60 días
- Si un día pasó y no tiene resumen, automáticamente se marca como negro

### 3. `src/sections/Calendar.tsx`
**Cambios principales**:
- Importados nuevos hooks: `useReminders`, `useFlowcharts`
- Importados nuevos componentes: `ReminderModal`, `FlowchartModal`
- Agregados iconos: `Bell`, `Network`, `Star`
- Nuevos estados para modales de recordatorio y flujograma

**Funcionalidad de días**:
- Renderizado de estrella (⭐) cuando percentage === 100%
- Renderizado de campana (🔔) cuando hay recordatorio
- Botones flotantes para acceder a recordatorios y flujogramas
- Tooltip al pasar mouse sobre recordatorio

**Handlers nuevos**:
- `handleReminderClick()` - Abre modal de recordatorio
- `handleFlowchartClick()` - Abre modal de flujograma

**Actualización de clearAllData()**:
- Ahora también elimina `calendar_reminders` y `calendar_flowcharts` del localStorage

## Funcionalidad Auto-Negro

### Implementación
```javascript
useEffect(() => {
  const checkPastDays = () => {
    // Revisa los últimos 60 días
    // Si un día ya pasó y no tiene resumen, lo marca como negro (0%)
  };
  
  checkPastDays();
  const interval = setInterval(checkPastDays, 3600000); // Cada hora
  
  return () => clearInterval(interval);
}, [summaries]);
```

### Comportamiento
- Se ejecuta al cargar la aplicación
- Se ejecuta automáticamente cada hora
- Revisa los últimos 60 días
- Solo marca días que ya pasaron (< today)
- No sobrescribe días que ya tienen resumen

## Funcionalidad de Recordatorios

### Características
- Un recordatorio por día
- Máximo 50 caracteres
- Almacenado en localStorage
- Tooltip visible al pasar mouse
- Ícono naranja en esquina superior derecha

### Estructura de datos
```typescript
interface Reminder {
  id: string;
  date: string; // YYYY-MM-DD
  text: string;
  createdAt: string;
}
```

## Funcionalidad de Flujogramas

### Características
- Múltiples nodos por flujograma
- Conexiones con flechas entre nodos
- Arrastrable visualmente (posiciones guardadas)
- Canvas SVG para conexiones
- Nodos editables y eliminables

### Estructura de datos
```typescript
interface Flowchart {
  id: string;
  date: string;
  nodes: FlowchartNode[];
  connections: FlowchartConnection[];
  createdAt: string;
}

interface FlowchartNode {
  id: string;
  text: string;
  x: number;
  y: number;
}

interface FlowchartConnection {
  from: string; // nodeId
  to: string;   // nodeId
}
```

### Interacción del usuario
1. Agregar nodo: Escribir texto + click "Nodo"
2. Seleccionar nodo: Click en el nodo (se pone azul)
3. Conectar: Con nodo seleccionado, click "Conectar" + click en otro nodo
4. Eliminar: Click en X roja de nodo o conexión

## Funcionalidad de Estrella

### Implementación
```jsx
{summary && summary.percentage === 100 && (
  <div className="absolute top-1 left-1">
    <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
  </div>
)}
```

### Comportamiento
- Solo visible cuando percentage === 100%
- Ubicación: esquina superior izquierda
- Color: amarillo (#fde047)
- Tamaño: 4x4 (16px)

## Almacenamiento localStorage

### Claves nuevas
- `calendar_reminders` - Array de Reminder
- `calendar_flowcharts` - Array de Flowchart

### Claves existentes
- `calendar_tasks`
- `calendar_study_subjects`
- `calendar_study_schedule`
- `calendar_day_summaries`

## CSS y Estilos

### Botones flotantes
- `opacity-0 hover:opacity-100` - Aparecen al pasar mouse
- Transición suave
- Colores: naranja (recordatorio), morado (flujograma)

### Modal de Flujograma
- Canvas: 900px ancho (responsive)
- Altura: 400px
- Nodos: 100px ancho
- Conexiones: SVG con flechas (`markerEnd`)

## Dependencias
No se agregaron nuevas dependencias externas. Todo construido con:
- React hooks existentes
- Componentes shadcn/ui existentes
- Lucide icons existentes

## Compatibilidad
- TypeScript: ✅ Tipos estrictos
- React 18: ✅
- Vite: ✅
- Tailwind CSS: ✅

## Testing sugerido
1. Probar auto-negro dejando pasar días sin marcar
2. Crear recordatorios y verificar persistencia
3. Crear flujogramas con múltiples nodos y conexiones
4. Verificar estrella aparece solo al 100%
5. Probar en diferentes navegadores
6. Verificar responsive en móvil

## Notas de rendimiento
- useEffect con interval (1 hora) - impacto mínimo
- localStorage - operaciones sincrónicas, rápidas
- SVG para conexiones - render eficiente
- No hay llamadas a API - todo local
