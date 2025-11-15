# Resumen del Proyecto - React Native App

## Descripción General

Este es un proyecto de **React Native** utilizando **Expo** que implementa una aplicación móvil con sistema de navegación completo, incluyendo Stack Navigation, Tab Navigation, y una pantalla de autenticación (Login/Registro) con diseño moderno usando Tailwind CSS (NativeWind).

## Stack Tecnológico

- **React Native** 0.81.5
- **Expo** ~54.0.22
- **React Navigation** (Stack y Bottom Tabs)
- **NativeWind** 4.2.1 (Tailwind CSS para React Native)
- **TypeScript** 5.9.2
- **Expo Vector Icons** (Ionicons)

## Estructura del Proyecto

```
my-app/
├── App.tsx                    # Componente principal de la aplicación
├── index.js                   # Punto de entrada de la aplicación
├── global.css                 # Estilos globales de Tailwind
├── tailwind.config.js         # Configuración de Tailwind CSS
├── babel.config.js            # Configuración de Babel
├── package.json               # Dependencias del proyecto
│
└── src/
    ├── navigation/
    │   ├── AuthStack.tsx      # Stack de navegación para autenticación
    │   ├── TabNavigator.tsx   # Navegador de pestañas inferior
    │   ├── HomeStack.tsx      # Stack de navegación para Home
    │   ├── ProfileStack.tsx   # Stack de navegación para Profile
    │   └── SettingsStack.tsx  # Stack de navegación para Settings
    │
    └── screens/
        ├── LoginScreen.tsx    # Pantalla de Login/Registro
        ├── HomeScreen.tsx     # Pantalla principal
        ├── HomeDetailScreen.tsx
        ├── ProfileScreen.tsx
        ├── ProfileDetailScreen.tsx
        ├── SettingsScreen.tsx
        └── SettingsDetailScreen.tsx
```

## Sistema de Navegación

### 1. AuthStack (Autenticación)
- **LoginScreen**: Pantalla de inicio de sesión y registro
  - Toggle entre modo Login y Registro
  - Campos: Email, Contraseña, Confirmar Contraseña
  - Opción de mostrar/ocultar contraseña
  - Botón "¿Olvidaste tu contraseña?"
  - Botones de login social (Google, Apple, Facebook) - solo UI
  - Diseño moderno con Tailwind CSS

### 2. TabNavigator (Navegación Principal)
Navegador de pestañas inferior con tres secciones principales:

- **Home Tab**: 
  - HomeStack con HomeScreen y HomeDetailScreen
  - Icono: home / home-outline

- **Profile Tab**:
  - ProfileStack con ProfileScreen y ProfileDetailScreen
  - Icono: person / person-outline

- **Settings Tab**:
  - SettingsStack con SettingsScreen y SettingsDetailScreen
  - Icono: settings / settings-outline

### 3. Stack Navigation
Cada tab tiene su propio Stack Navigator que permite:
- Navegación entre pantallas principales y de detalle
- Headers personalizados
- Transiciones de pantalla

## Pantalla de Login/Registro

### Características Principales

1. **Diseño Moderno**:
   - Fondo con gradiente suave (azul claro)
   - Tarjeta blanca con sombras
   - Bordes redondeados
   - Iconos en los campos de entrada

2. **Funcionalidades**:
   - Toggle entre modo Login y Registro
   - Validación visual de campos
   - Mostrar/ocultar contraseña
   - Botón de recuperación de contraseña (solo en Login)
   - Opciones de login social (UI solamente)

3. **Campos del Formulario**:
   - **Email**: Input con icono de correo
   - **Contraseña**: Input con icono de candado y toggle de visibilidad
   - **Confirmar Contraseña**: Solo visible en modo Registro

4. **Estados**:
   - Estado de login/registro
   - Estado de visibilidad de contraseñas
   - Valores de los campos de entrada

## Configuración de Tailwind CSS (NativeWind)

### Archivos de Configuración

1. **tailwind.config.js**:
   ```javascript
   {
     content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
     presets: [require("nativewind/preset")],
   }
   ```

2. **babel.config.js**:
   ```javascript
   {
     presets: ['babel-preset-expo']
   }
   ```

3. **global.css**:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **index.js**: Importa `./global.css` para aplicar los estilos

### Uso de Tailwind en Componentes

Los componentes utilizan clases de Tailwind directamente en la prop `className`:
- `className="flex-1 bg-blue-50"`
- `className="bg-white rounded-2xl p-6 shadow-lg"`
- `className="bg-indigo-600 rounded-xl py-4"`

## Flujo de Navegación Actual

```
App.tsx
  └── NavigationContainer
      └── AuthStack
          └── LoginScreen
```

**Nota**: Actualmente la aplicación muestra solo la pantalla de Login. Para implementar el flujo completo, se necesitaría:
1. Lógica de autenticación (backend)
2. Estado de autenticación global (Context/Redux)
3. Navegación condicional entre AuthStack y TabNavigator

## Próximos Pasos Sugeridos

1. **Implementar Lógica de Autenticación**:
   - Conectar con backend/API
   - Manejar tokens de autenticación
   - Validación de formularios

2. **Estado de Autenticación**:
   - Crear AuthContext o usar Redux
   - Manejar sesión de usuario
   - Navegación condicional

3. **Integración Completa**:
   - Mostrar TabNavigator después del login exitoso
   - Logout y redirección a LoginScreen
   - Persistencia de sesión

4. **Mejoras de UI/UX**:
   - Animaciones de transición
   - Loading states
   - Mensajes de error/éxito
   - Validación en tiempo real

## Comandos Útiles

```bash
# Iniciar el servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en Web
npm run web

# Linter
npm run lint
```

## Dependencias Principales

- `@react-navigation/native`: Navegación principal
- `@react-navigation/stack`: Navegación tipo stack
- `@react-navigation/bottom-tabs`: Navegación con pestañas
- `nativewind`: Tailwind CSS para React Native
- `tailwindcss`: Framework CSS
- `expo`: Framework de React Native
- `@expo/vector-icons`: Iconos (Ionicons)

## Estado del Proyecto

✅ **Completado**:
- Configuración de React Native con Expo
- Sistema de navegación (Stack y Tabs)
- Pantalla de Login/Registro con diseño moderno
- Configuración de Tailwind CSS (NativeWind)
- Estructura de carpetas organizada

⏳ **Pendiente**:
- Lógica de autenticación (backend)
- Integración de navegación condicional
- Validación de formularios
- Manejo de estado global

