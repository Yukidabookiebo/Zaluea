import Server from 'bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';


const bare = new Server('/bare/');
const serve = new nodeStatic.Server('Site/');
const server = http.createServer();

server.on('request', async (request, response) => {
    if (await bare.route_request(request, response)) return;
    serve.serve(request, response);
});

server.on('upgrade', async (req, socket, head) => {
    if (await bare.route_upgrade(req, socket, head)) return;
    socket.end();
});

server.listen(process.env.PORT || 8080);