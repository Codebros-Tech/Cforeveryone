import Pusher from "pusher-js";
import Echo from "laravel-echo";
import axiosClient from "./axios.js";

window.Pusher = Pusher;

// prepared an event class setup and exported it via echo.
window.Echo = new Echo({
    authorizer: (channel, callback) => {
        return {
            authorize: (socketId, callback) => {
                axiosClient.post('/api/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel,
                })
                    .then(response => {
                        callback(null, response.data);
                    })
                    .catch(error => {
                        callback(error);
                    });
            }
        }
    },
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
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
