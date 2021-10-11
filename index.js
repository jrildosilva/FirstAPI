const http = require ('http');

const url = require ('url');

const routes = require('./routes');

const server = http.createServer ((request, response) =>{
    const parsedUrl = url.parse(request.url, true);
    console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

     let { pathname } = parsedUrl;
     let id = null;

     const splitEndPoint = pathname.split('/').filter(Boolean);
     console.log(splitEndPoint);

     if (splitEndPoint.length > 1) {
         pathname = `/${splitEndPoint[0]}/:id`;
         id = splitEndPoint[1];
     }

    const route = routes.find((routeOBJ) => (
         routeOBJ.endpoint === pathname && routeOBJ.method === request.method
    ));

    if(route) {
        request.query = parsedUrl.query;
        request.params = { id };

        response.send =(StatusCode, body ) => {
            response.writeHead(StatusCode, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(body));
        };

        route.handler(request, response);
        UserController.listUsers(request, response);
    } else{
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end(`Cannot ${request.method} ${parsedUrl.pathname}`); 
    }

   /* if (request.url=== '/users' && request.method === 'GET'){
        UserController.listUsers(request,response);
    
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end(`Cannot ${request.method} ${request.urlF}`);
    } */
   /*teste git github*/

   /* response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<h1> Hello World! </h1>, ');*/
    
});


server.listen(3000, ()=> console.log('Server started at http://localhost:3000'));