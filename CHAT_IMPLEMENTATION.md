# Implementación de Chat en Tiempo Real

## Descripción General
Se ha implementado una pantalla completa de chat en tiempo real usando Socket.IO y REST API.

## Archivos Creados

### Modelos y Tipos
- **`frontend/src/app/features/chat/models/chat.models.ts`**
  - `UsuarioRemitente`: Datos del usuario que envía mensaje
  - `Mascota`: Datos de la mascota
  - `Match`: Información del match entre dos mascotas
  - `ChatMessage`: Estructura de un mensaje
  - `LastMessage`: Último mensaje en una conversación
  - `InboxChat`: Conversación en el inbox
  - `SendMessagePayload`: Payload para enviar mensaje
  - `JoinChatPayload`: Payload para unirse a un chat

### Servicios
- **`frontend/src/app/features/chat/services/chat.service.ts`**
  - `getInbox(idMascota: number)`: Obtiene lista de conversaciones
  - `getHistory(idMatch: number)`: Obtiene historial de mensajes
  - Base URL: `http://localhost:3000/messages`

- **`frontend/src/app/features/chat/services/chat-socket.service.ts`**
  - `connect()`: Conecta al servidor Socket.IO
  - `disconnect()`: Desconecta
  - `joinChat(idMatch)`: Se une a un chat específico
  - `sendMessage(payload)`: Envía un mensaje
  - `onReceiveMessage()`: Observable para recibir mensajes
  - Manejo automático de listeners y evita duplicados
  - URL: `http://localhost:3000`

### Componente
- **`frontend/src/app/features/chat/chat.component.ts`**
  - Component lógica principal
  - Gestión de inbox
  - Carga de historial
  - Envío y recepción de mensajes
  - Scroll automático
  - Manejo de estados (loading, error, vacío)

- **`frontend/src/app/features/chat/chat.component.html`**
  - Sidebar con lista de conversaciones
  - Área principal de chat
  - Input para escribir mensajes
  - Estados de vacío, error y loading

- **`frontend/src/app/features/chat/chat.component.scss`**
  - Estilos responsive
  - Diferenciación visual entre mensajes propios y ajenos
  - Diseño moderno con colores verde (propio) y gris (ajeno)
  - Responsive para móvil

### Módulo y Rutas
- **`frontend/src/app/features/chat/chat-module.ts`** (Actualizado)
  - Declaración del componente ChatComponent
  - Importación de FormsModule para ngModel

- **`frontend/src/app/features/chat/chat-routing-module.ts`** (Actualizado)
  - Ruta principal '' apunta a ChatComponent

- **`frontend/src/app/app-routing-module.ts`** (Actualizado)
  - Nueva ruta lazy-loaded: `/chat` → ChatModule

## Variables de Entorno Necesarias

### Desarrollo
```typescript
// En chat.service.ts (línea 13)
private readonly apiBaseUrl = 'http://localhost:3000/messages';

// En chat-socket.service.ts (línea 11)
private readonly socketUrl = 'http://localhost:3000';
```

### Producción (TODO)
Cambiar a:
```typescript
private readonly apiBaseUrl = 'https://tu-backend-render.herokuapp.com/messages';
private readonly socketUrl = 'https://tu-backend-render.herokuapp.com';
```

## Datos Duros Que Necesitan Conexión

En `chat.component.ts` (líneas 35-36):
```typescript
currentUserId: number = 1; // TODO: obtener de AuthService
currentMascotaId: number = 1; // TODO: obtener de URL o estado
```

**Opciones para obtenerlos:**
1. De AuthService (si existe)
2. De localStorage (si se guarda al login)
3. De la ruta actual (ej. `/chat/:idMascota`)
4. De un servicio de estado global

## Eventos Socket.IO

### Cliente → Servidor
```typescript
// Unirse a un chat
socket.emit('joinChat', { idMatch: 5 });

// Enviar mensaje
socket.emit('sendMessage', {
  idMatch: 5,
  idUsuario: 1,
  contenido: 'Hola!'
});

// Salir de un chat (automático)
socket.emit('leaveChat', { idMatch: 5 });
```

### Servidor → Cliente
```typescript
// Recibir mensaje en tiempo real
socket.on('receiveMessage', (message) => {
  // message tiene estructura ChatMessage
  // { id_mensaje, contenido, fecha_envio, usuario_remitente }
});
```

## Flujo de Funcionamiento

1. **OnInit**:
   - Conecta Socket.IO
   - Carga inbox (GET /messages/inbox/:idMascota)
   - Se suscribe a receiveMessage

2. **Al seleccionar chat**:
   - Carga historial (GET /messages/history/:idMatch)
   - Emite joinChat al servidor
   - Actualiza la vista

3. **Al enviar mensaje**:
   - Emite sendMessage al servidor
   - Limpia el input
   - Socket recibe receiveMessage del servidor
   - Se agrega a la lista local (sin duplicados)

4. **OnDestroy**:
   - Desconecta Socket.IO
   - Limpia subscripciones

## Validaciones Implementadas

✅ No enviar mensajes vacíos
✅ Limpiar input después de enviar
✅ Deshabilitar botón si no hay chat seleccionado
✅ Deshabilitar botón si contenido está vacío
✅ Evitar duplicados en receiveMessage
✅ Cambio correcto de chat (limpiar listeners anteriores)
✅ Scroll automático a último mensaje

## Dependencias

Ya están instaladas:
- `socket.io-client@4.8.3` ✅
- `@angular/common` ✅
- `@angular/forms` (necesario para FormsModule) ✅
- `rxjs` ✅

## Ruta de Acceso

```
http://localhost:4200/chat
```

## Instalación y Compilación

```bash
# Frontend
cd frontend
npm install
npm start

# Backend debe estar corriendo en http://localhost:3000
```

## Próximos Pasos / TODOs

1. **Conectar AuthService para obtener `currentUserId`**
   - Buscar en `core/services/auth.ts`
   - O usar localStorage si es donde se guarda

2. **Conectar con la ruta para obtener `currentMascotaId`**
   - Puede ser un parámetro de ruta
   - O parte del estado de la aplicación

3. **Reemplazar URLs locales con variables de entorno en producción**
   - Crear `environment.ts` y `environment.prod.ts`
   - Inyectar en los servicios

4. **Agregar indicador de "usuario escribiendo"**
   - Socket event adicional: `userTyping`

5. **Agregar notificaciones push o indicador de nuevos mensajes**
   - Badge en el sidebar

6. **Testear con múltiples usuarios simultáneamente**
   - Abrir dos navegadores o pestañas

7. **Manejar desconexiones y reconexión automática**
   - Ya implementado en socket config (reconnection: true)

8. **Agregar persistencia de última posición leída**
   - Guardar idMensaje como "leído hasta aquí"

## Errores Comunes

### "Cannot find module 'socket.io-client'"
- Solución: `npm install socket.io-client`

### "Socket no está conectado"
- Solución: ChatSocketService.connect() se llama automáticamente en ChatComponent.ngOnInit()
- Verificar que el backend esté corriendo

### Mensajes duplicados
- Solución: Ya se evita comparando `id_mensaje` con mensajes existentes

### No carga las conversaciones
- Verificar que `/messages/inbox/:idMascota` existe en backend
- Verificar que currentMascotaId sea correcto

### No recibe mensajes en tiempo real
- Verificar que joinChat se emitió después de cargar historial
- Revisar WebSocket connection en DevTools → Network → WS

## Desarrollo Local

1. Backend: `cd backend && npm start` (puerto 3000)
2. Frontend: `cd frontend && npm start` (puerto 4200)
3. Abrir `http://localhost:4200/chat`

## Referencias Backend

Ver README_API.md o backend/README_BACKEND.md para:
- Estructura completa de endpoints
- Autenticación requerida (headers)
- Paginación si existe
- Campos adicionales en responses
