# Configuración de Firebase

## Pasos para conectar Firebase con tu aplicación

### 1. Obtener las credenciales de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto (o crea uno nuevo si no tienes)
3. Ve a **Project Settings** (Configuración del proyecto) - icono de engranaje
4. En la sección **Your apps**, busca o crea una app **Web** (icono `</>`)
5. Copia los valores de configuración que aparecen en el objeto `firebaseConfig`

### 2. Configurar el archivo de Firebase

Abre el archivo `src/config/firebase.ts` y reemplaza los valores de `TU_*` con tus credenciales reales:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSy...", // Tu API Key
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 3. Habilitar Authentication en Firebase

1. En Firebase Console, ve a **Authentication** (Autenticación)
2. Haz clic en **Get Started** (Comenzar)
3. Ve a la pestaña **Sign-in method** (Método de inicio de sesión)
4. Habilita **Email/Password**:
   - Haz clic en "Email/Password"
   - Activa "Enable"
   - Haz clic en "Save"

### 4. Reglas de seguridad (opcional pero recomendado)

Si vas a usar Firestore, configura las reglas de seguridad en **Firestore Database** > **Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura solo a usuarios autenticados
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 5. Verificar la conexión

Una vez configurado, la aplicación debería poder:
- ✅ Registrar nuevos usuarios
- ✅ Iniciar sesión con usuarios existentes
- ✅ Mostrar mensajes de error apropiados
- ✅ Navegar a Home después de autenticación exitosa

## Estructura de archivos creada

```
src/
├── config/
│   └── firebase.ts          # Configuración de Firebase
└── services/
    └── authService.ts       # Funciones de autenticación
```

## Funciones disponibles

### `registerUser(email, password)`
Registra un nuevo usuario en Firebase Authentication.

### `loginUser(email, password)`
Inicia sesión con un usuario existente.

### `logoutUser()`
Cierra la sesión del usuario actual.

### `getCurrentUser()`
Obtiene el usuario actualmente autenticado.

## Manejo de errores

Los errores de Firebase se traducen automáticamente a mensajes en español:
- "Este correo electrónico ya está registrado"
- "Contraseña incorrecta"
- "El correo electrónico no es válido"
- Y más...

## Notas importantes

- ⚠️ **Nunca subas tus credenciales de Firebase a un repositorio público**
- ⚠️ Considera usar variables de entorno para las credenciales en producción
- ✅ Firebase maneja automáticamente la persistencia de sesión
- ✅ Los usuarios permanecen autenticados incluso después de cerrar la app

