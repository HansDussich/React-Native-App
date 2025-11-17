import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

const AssistantScreen = () => {
  const navigation = useNavigation();
  
  // HTML content for the WebView
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>Asistente Virtual - Sergio</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }
            
            body {
                background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }
            
            .container {
                width: 100%;
                max-width: 100%;
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                overflow: hidden;
                padding: 30px;
            }
            
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            
            .header h1 {
                color: #2c3e50;
                font-size: 1.8rem;
                margin-bottom: 10px;
                text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
            }
            
            .assistant-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
            }
            
            .assistant-avatar {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background: linear-gradient(135deg, #3498db, #8e44ad);
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                position: relative;
                overflow: hidden;
            }
            
            .status-indicator {
                padding: 8px 15px;
                border-radius: 20px;
                font-weight: bold;
                color: white;
                font-size: 0.9rem;
                margin-top: 5px;
            }
            
            .status-idle {
                background-color: #95a5a6;
            }
            
            .status-listening {
                background-color: #e74c3c;
            }
            
            .status-thinking {
                background-color: #3498db;
            }
            
            .status-speaking {
                background-color: #2ecc71;
            }
            
            .message-container {
                width: 100%;
                background-color: white;
                border-radius: 15px;
                padding: 15px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                min-height: 120px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                margin: 10px 0;
            }
            
            .message-text {
                font-size: 1rem;
                color: #2c3e50;
                margin-bottom: 10px;
                line-height: 1.4;
            }
            
            .question-text {
                font-style: italic;
                color: #7f8c8d;
                margin-top: 8px;
                padding: 8px;
                background-color: #f8f9fa;
                border-radius: 10px;
                width: 100%;
                font-size: 0.9rem;
            }
            
            .controls {
                display: flex;
                gap: 10px;
                margin-top: 15px;
                width: 100%;
                justify-content: center;
            }
            
            .btn {
                padding: 12px 20px;
                border: none;
                border-radius: 50px;
                font-size: 0.9rem;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                gap: 8px;
                color: white;
            }
            
            .btn-primary {
                background-color: #3498db;
            }
            
            .btn-secondary {
                background-color: #e74c3c;
            }
            
            .visualizer {
                display: flex;
                gap: 3px;
                height: 30px;
                align-items: center;
                justify-content: center;
                margin: 10px 0;
                width: 100%;
            }
            
            .bar {
                width: 5px;
                background-color: #3498db;
                border-radius: 2px;
                transition: height 0.2s ease;
                height: 10px;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            @keyframes thinking {
                0% { transform: scale(1); background-color: rgba(52, 152, 219, 0.3); }
                50% { transform: scale(1.1); background-color: rgba(52, 152, 219, 0.6); }
                100% { transform: scale(1); background-color: rgba(52, 152, 219, 0.3); }
            }
            
            @keyframes speaking {
                0% { transform: scale(1); background-color: rgba(46, 204, 113, 0.3); }
                50% { transform: scale(1.05); background-color: rgba(46, 204, 113, 0.6); }
                100% { transform: scale(1); background-color: rgba(46, 204, 113, 0.3); }
            }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Asistente Virtual - Sergio</h1>
                <p>Hazme cualquier pregunta y yo te responderé</p>
            </div>
            
            <div class="assistant-container">
                <div class="assistant-avatar" id="avatar">
                    <i class="fas fa-robot" style="font-size: 50px; color: white;"></i>
                </div>
                
                <div class="status-indicator status-idle" id="status">
                    En espera
                </div>
                
                <div class="message-container">
                    <p class="message-text" id="mensaje">Yo soy Sergio, tu asistente. ¿Qué quieres preguntar?</p>
                    <div class="question-text" id="question"></div>
                    
                    <div class="visualizer" id="visualizer">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                </div>
                
                <div class="controls">
                    <button class="btn btn-primary" id="startBtn">
                        <i class="fas fa-microphone"></i> Iniciar escucha
                    </button>
                    <button class="btn btn-secondary" id="stopBtn">
                        <i class="fas fa-stop"></i> Detener
                    </button>
                </div>
            </div>
        </div>

        <script>
            const API_KEY = "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";

            // Elementos del DOM
            const avatar = document.getElementById('avatar');
            const status = document.getElementById('status');
            const mensaje = document.getElementById('mensaje');
            const question = document.getElementById('question');
            const visualizer = document.getElementById('visualizer');
            const bars = visualizer.querySelectorAll('.bar');
            const startBtn = document.getElementById('startBtn');
            const stopBtn = document.getElementById('stopBtn');

            // Verificar compatibilidad con reconocimiento de voz
            const soporteVoz = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

            if (!soporteVoz) {
                mensaje.textContent = "Tu navegador no soporta el reconocimiento de voz. Por favor, usa Chrome o Edge.";
                startBtn.disabled = true;
            }

            // Configurar reconocimiento de voz
            const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            reconocimiento.continuous = true;
            reconocimiento.interimResults = false;
            reconocimiento.lang = 'es-ES';

            // Variables para el visualizador de audio
            let animationId;
            let isListening = false;

            // Función para animar el visualizador
            function animateVisualizer() {
                bars.forEach(bar => {
                    const height = Math.random() * 20 + 5;
                    bar.style.height = height + 'px';
                });
                
                if (isListening) {
                    animationId = requestAnimationFrame(animateVisualizer);
                }
            }

            // Función para detener el visualizador
            function stopVisualizer() {
                isListening = false;
                cancelAnimationFrame(animationId);
                bars.forEach(bar => {
                    bar.style.height = '10px';
                });
            }

            // Función para actualizar la interfaz según el estado
            function updateUI(state, text = '') {
                // Remover todas las clases de estado
                avatar.className = 'assistant-avatar';
                status.className = 'status-indicator status-idle';
                
                // Detener el visualizador por defecto
                stopVisualizer();
                
                switch(state) {
                    case 'idle':
                        status.textContent = 'En espera';
                        status.classList.add('status-idle');
                        mensaje.textContent = text || 'Yo soy Sergio, tu asistente. ¿Qué quieres preguntar?';
                        question.textContent = '';
                        break;
                        
                    case 'listening':
                        avatar.classList.add('listening');
                        status.textContent = 'Escuchando...';
                        status.className = 'status-indicator status-listening';
                        mensaje.textContent = 'Escuchando... Hazme una pregunta.';
                        isListening = true;
                        animateVisualizer();
                        break;
                        
                    case 'thinking':
                        avatar.classList.add('thinking');
                        status.textContent = 'Pensando...';
                        status.className = 'status-indicator status-thinking';
                        mensaje.textContent = 'Procesando tu pregunta...';
                        question.textContent = text;
                        break;
                        
                    case 'speaking':
                        avatar.classList.add('speaking');
                        status.textContent = 'Respondiendo...';
                        status.className = 'status-indicator status-speaking';
                        mensaje.textContent = text;
                        isListening = true;
                        animateVisualizer();
                        break;
                }
            }

            // Event listeners para los botones
            startBtn.addEventListener('click', () => {
                updateUI('listening');
                reconocimiento.start();
            });

            stopBtn.addEventListener('click', () => {
                reconocimiento.stop();
                updateUI('idle');
            });

            // Cuando se detecta voz convertida a texto
            reconocimiento.onresult = async function(event) {
                let pregunta = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    pregunta += event.results[i][0].transcript;
                }

                updateUI('thinking', pregunta);

                // Obtener respuesta de Groq
                const respuesta = await obtenerRespuestaDeDeepSeek(pregunta);

                // Reproducir la respuesta
                if (respuesta) {
                    updateUI('speaking', respuesta);
                    reproducirAudio(respuesta);
                } else {
                    updateUI('speaking', "Lo siento, no pude obtener una respuesta.");
                    reproducirAudio("Lo siento, no pude obtener una respuesta.");
                }
            };

            // Petición a la API de Groq
            async function obtenerRespuestaDeDeepSeek(pregunta) {
                try {
                    const respuesta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + API_KEY
                        },
                        body: JSON.stringify({
                            model: "llama-3.1-8b-instant",
                            messages: [
                                { 
                                    role: "system", 
                                    content: "Eres Sergio, un asistente virtual. Responde de manera concisa y directa, máximo 2 párrafos. Sé amable pero evita respuestas demasiado extensas. Responde siempre como Sergio." 
                                },
                                { role: "user", content: pregunta }
                            ],
                            max_tokens: 150,
                            temperature: 0.7
                        })
                    });

                    const data = await respuesta.json();
                    return data?.choices?.[0]?.message?.content || null;

                } catch (error) {
                    console.error("Error en la API:", error);
                    return null;
                }
            }

            // Text-to-Speech
            function reproducirAudio(texto) {
                const utterance = new SpeechSynthesisUtterance(texto);
                utterance.lang = "es-ES";
                
                utterance.onend = function() {
                    updateUI('idle');
                };
                
                speechSynthesis.speak(utterance);
            }

            reconocimiento.onerror = function(event) {
                console.error('Error en voz:', event.error);
                updateUI('idle', 'Hubo un error al escuchar. Intenta de nuevo.');
            };
            
            reconocimiento.onend = function() {
                // Solo volver a estado idle si no estamos en modo speaking
                if (!avatar.classList.contains('speaking')) {
                    updateUI('idle');
                }
            };

            // Reproducir saludo al cargar la página
            window.onload = function() {
                setTimeout(function() {
                    reproducirAudio("Yo soy Sergio, tu asistente personal. ¿En qué puedo ayudarte hoy?");
                }, 1000);
            };
        </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Asistente Virtual</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.webviewContainer}>
        <WebView
          source={{ html: htmlContent }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          originWhitelist={['*']}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  webview: {
    flex: 1,
  },
});

export default AssistantScreen;
