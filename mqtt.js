// MQTT Broker settings
const brokerUrl = 'wss://n1781645.ala.us-east-1.emqxsl.com:8883'; // WebSocket secure URL
const clientId = 'webClient_' + Math.random().toString(16).substr(2, 8);
const mqttUser = 'cochabamba';
const mqttPassword = 'bolivia';

// Connect to the MQTT broker
const client = mqtt.connect(brokerUrl, {
    clientId: clientId,
    username: mqttUser,
    password: mqttPassword,
    reconnectPeriod: 1000,
    protocolVersion: 5
});

// Handle connection success
client.on('connect', () => {
    console.log('Conectado al broker MQTT');
});

// Handle connection error
client.on('error', (error) => {
    console.log('Error de conexión:', error);
});

// Function to send MQTT messages to control LEDs
function sendMQTTMessage(topic, message) {
    client.publish(topic, message, { qos: 1, retain: false }, (error) => {
        if (error) {
            console.error('Error al publicar el mensaje:', error);
        }
    });
}

// Function to toggle LED state
function toggleLED(ledId) {
    let currentState = ledStates[ledId];
    let newState = currentState === 'on' ? 'off' : 'on';
    ledStates[ledId] = newState;
    sendMQTTMessage(`test/${ledId}`, newState);
}

// Initial LED states
let ledStates = {
    led1: 'off',
    led2: 'off',
    led3: 'off',
    led4: 'off'
};

// Event listeners for buttons
document.getElementById('led1-toggle').addEventListener('click', () => {
    toggleLED('led1');
});

document.getElementById('led2-toggle').addEventListener('click', () => {
    toggleLED('led2');
});

document.getElementById('led3-toggle').addEventListener('click', () => {
    toggleLED('led3');
});

document.getElementById('led4-toggle').addEventListener('click', () => {
    toggleLED('led4');
});
