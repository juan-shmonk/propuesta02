# InvenTrack - Sistema de Control de Inventario

## 📋 Características Actuales

### ✅ Módulos Implementados

1. **Dashboard**
   - Vista general del inventario
   - Métricas clave (total productos, stock bajo, movimientos)
   - Gráficas de movimientos semanales
   - Stock por categoría
   - Alertas de stock bajo
   - Actividad reciente (entradas/salidas)

2. **Productos**
   - Lista completa de productos con filtros
   - Alta de nuevos productos
   - Edición de productos existentes
   - Detalle completo de producto
   - Búsqueda por nombre o SKU
   - Filtros por categoría
   - Alertas visuales de stock bajo

3. **Entradas**
   - Registro de entrada de mercancía
   - Historial completo de entradas
   - Filtros por fecha y búsqueda
   - Vista previa del stock resultante
   - Asignación de proveedor
   - Control de responsables
   - Observaciones por movimiento

4. **Salidas**
   - Registro de salida de mercancía
   - Historial completo de salidas
   - Validación de stock disponible
   - Destino de mercancía
   - Control de responsables
   - Alertas de stock bajo post-salida

5. **Stock/Inventario**
   - Vista general de existencias
   - Indicadores visuales de disponibilidad
   - Filtros por estado (OK, Bajo)
   - Filtros por categoría
   - Ajuste manual de stock
   - Múltiples tipos de ajuste (sumar, restar, establecer)
   - Registro de motivos de ajuste

6. **Reportes**
   - KPIs principales
   - Gráficas de movimientos en el tiempo
   - Distribución de stock por categoría
   - Valorización del inventario
   - Top productos con más movimientos
   - Resumen por categoría
   - Exportación de reportes (UI preparada)

### 🎨 Características de Diseño

- ✅ Diseño responsive (desktop y móvil)
- ✅ Sidebar lateral colapsable
- ✅ Cards con métricas
- ✅ Tablas ordenadas y claras
- ✅ Formularios bien estructurados
- ✅ Iconografía coherente (Lucide React)
- ✅ Alertas visuales para stock bajo
- ✅ Gráficas interactivas (Recharts)
- ✅ Colores profesionales (azul, gris, verde, naranja)
- ✅ Componentes reutilizables

### 📱 Pantallas Móviles Implementadas

- ✅ Dashboard móvil optimizado
- ✅ Lista de productos en cards
- ✅ Formularios adaptables
- ✅ Registro de entradas/salidas móvil
- ✅ Vista de stock móvil
- ✅ Menú hamburguesa

---

## 🚀 Funcionalidades Escalables Sugeridas

### Fase 2: Gestión Avanzada

1. **Módulo de Proveedores**
   - CRUD completo de proveedores
   - Historial de compras por proveedor
   - Evaluación de proveedores
   - Contactos y documentos

2. **Usuarios y Roles**
   - Sistema de autenticación real
   - Roles: Admin, Almacenista, Supervisor, Consulta
   - Permisos granulares por módulo
   - Auditoría de acciones por usuario

3. **Múltiples Almacenes**
   - Gestión de varios almacenes/sucursales
   - Vista de stock por ubicación
   - Transferencias entre almacenes
   - Reportes comparativos

### Fase 3: Automatización

4. **Código de Barras**
   - Escaneo con cámara del dispositivo
   - Generación de códigos de barras
   - Entrada/salida rápida por escaneo
   - Impresión de etiquetas

5. **Notificaciones**
   - Alertas automáticas de stock bajo
   - Notificaciones por email
   - Recordatorios de reorden
   - Alertas de productos próximos a vencer

6. **Órdenes de Compra**
   - Generación automática de órdenes
   - Seguimiento de órdenes pendientes
   - Recepción parcial de mercancía
   - Integración con proveedores

### Fase 4: Análisis Avanzado

7. **Reportes Avanzados**
   - Análisis ABC de productos
   - Proyección de demanda
   - Cálculo de punto de reorden
   - Análisis de rotación
   - Reportes personalizables

8. **Dashboard Ejecutivo**
   - KPIs personalizables
   - Comparativas mes/año
   - Tendencias y predicciones
   - Metas y objetivos

### Fase 5: Integraciones

9. **API REST**
   - Endpoints para integraciones externas
   - Webhooks para eventos
   - Documentación OpenAPI

10. **Exportación de Datos**
    - Excel/CSV detallado
    - PDF con formato profesional
    - Exportación programada
    - Integración con contabilidad

---

## 🛠️ Stack Tecnológico Actual

- **Frontend**: React 18.3.1
- **Routing**: React Router 7.13.0
- **Estilos**: Tailwind CSS 4.1.12
- **Gráficas**: Recharts 2.15.2
- **Iconos**: Lucide React 0.487.0
- **Formularios**: React Hook Form 7.55.0
- **Build**: Vite 6.3.5

---

## 📝 Datos Mock Incluidos

El sistema incluye datos de ejemplo realistas para:
- 8 productos de diferentes categorías
- 5 entradas registradas
- 5 salidas registradas
- 6 categorías de productos
- 10 proveedores
- 5 usuarios del sistema

---

## 🎯 Uso del Sistema

### Inicio de Sesión
- Ruta: `/login`
- Credenciales demo: cualquier email/contraseña

### Navegación Principal
- **Dashboard**: `/` - Vista general del sistema
- **Productos**: `/productos` - Gestión de catálogo
- **Entradas**: `/entradas` - Historial y registro
- **Salidas**: `/salidas` - Historial y registro
- **Stock**: `/stock` - Control de existencias
- **Reportes**: `/reportes` - Análisis y estadísticas

### Flujo Típico de Trabajo

1. **Dar de alta un producto**: Productos → Nuevo Producto
2. **Registrar entrada**: Entradas → Registrar Entrada
3. **Registrar salida**: Salidas → Registrar Salida
4. **Revisar stock**: Stock → Ver alertas de stock bajo
5. **Ajustar inventario**: Stock → Ajustar Stock
6. **Generar reportes**: Reportes → Seleccionar filtros

---

## 📐 Diseño Responsive

### Desktop (>1024px)
- Sidebar fijo lateral
- Tablas completas con todas las columnas
- Gráficas en grid de 2 columnas
- Vista optimizada para productividad

### Tablet (768px - 1023px)
- Sidebar colapsable
- Tablas con scroll horizontal
- Gráficas adaptadas

### Móvil (<768px)
- Menú hamburguesa
- Cards en lugar de tablas
- Botones de acción simplificados
- Formularios apilados verticalmente

---

## 🎨 Guía de Colores

- **Primario (Azul)**: `#2563eb` - Acciones principales, enlaces
- **Éxito (Verde)**: `#10b981` - Entradas, estados positivos
- **Advertencia (Naranja)**: `#f59e0b` - Salidas, alertas
- **Error (Rojo)**: `#ef4444` - Errores críticos
- **Neutro (Gris)**: `#6b7280` - Textos secundarios

---

## 📄 Licencia

Sistema desarrollado como propuesta universitaria.
Libre de usar y modificar según necesidades del proyecto.

---

**Versión**: 1.0.0  
**Fecha**: Abril 2026  
**Estado**: ✅ Propuesta Completa y Funcional
