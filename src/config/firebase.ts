import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Reemplaza estos valores con la configuración de tu proyecto Firebase
// Puedes encontrarlos en Firebase Console > Project Settings > General > Your apps
// Para una app web, busca la sección "SDK setup and configuration" > "Config"
const firebaseConfig = {
  apiKey: "AIzaSyBhmConvpqwDOFygU47VKU7iQzmiSg9Do8",
  authDomain: "dbreactnative-3c62b.firebaseapp.com",
  projectId: "dbreactnative-3c62b",
  storageBucket: "dbreactnative-3c62b.firebasestorage.app",
  messagingSenderId: "10226794391",
  appId: "1:10226794391:web:4e0af114ab2720e8e04ed2",
  measurementId: "G-QSY8D9H8CS"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth (Firebase maneja la persistencia automáticamente en React Native)
const auth = getAuth(app);

// Inicializar Firestore
const db = getFirestore(app);

export { auth, db };
export default app;

