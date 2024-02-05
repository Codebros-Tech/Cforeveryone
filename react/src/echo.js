import Pusher from "pusher-js";
import Echo from "laravel-echo";
import axios from 'axios'

window.Pusher = Pusher;

const token = `Bearer ${localStorage.getItem('TOKEN')}`;
// const key  = `${import.meta.env.VITE_APP_KEY}`;
const key = `${import.meta.env.VITE_PUSHER_APP_KEY}`;
const baseUrl = 'http://localhost:8000';

// prepared an event class setup and exported it via echo.
window.Echo = new Echo({
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                axios.post('http://localhost:8000/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                }, {
                    headers: {
                        Authorization: token,
                        // "Content-Type: "application/json"
                    }
                })
                    .then(response => {
                        callback(null, response.data);
                    })
                    .catch(error => {
                        callback(error);
                    });
            }
        };
    },
    authEndpoint: `${baseUrl}/broadcasting/auth`,
    auth: {
        headers: {
            'Authorization': token,
            // 'X-CSRF-Token': key,
            'common': {
                'X-Requested-With': 'XMLHttpRequest',
            }
        }
    },
    broadcaster: 'pusher',
    key: key,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
    // wsHost: import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
    wsHost: window.location.hostname,
    wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
    encrypted: false,
    wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    // forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
    forceTLS: false, // only required when we are using SSL
    enabledTransports: ['ws', 'wss'], //Only web socket connection can happen here.
});


const echo = window.Echo;

export default echo
