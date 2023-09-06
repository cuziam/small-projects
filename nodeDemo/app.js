const http = require("http");

function handleRequest(request, response) {
  if (request.url === "/currenttime") {
    response.end(`<h1>${new Date()}<h1>`);
  } else if (request.url === "/") {
    response.statusCode = 200;
    response.end("<h1>hello world!</h1>"); //response message(http가 종료될 때 보낼 메세지임)
  }
}
const server = http.createServer(handleRequest);
server.listen(4781);
