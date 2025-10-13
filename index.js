require("./core/api/main.js");

const appServer = require('./app/server.js');
appServer.server.listen(appServer.PORT, () => {
    console.log(`Server running at http://localhost:${appServer.PORT}/`);
}).on('error', err => {
    console.error('Failed to start server on port', appServer.PORT, ':', err);
    appServer.server.listen(3000, () => {
        console.log(`Server running at http://localhost:3000/`);
    });
});