const fs = require("fs");
const path = require("path");
const express = require("express"); //express는 그냥 객체가 아니라 함수로 되어있음.
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/currenttime", (req, res) => {
  //get요청에 대한 핸들러를 만들어줌.
  res.send(`<h1>${new Date()}<h1>`);
});
app.get("/", (req, res) => {
  res.send(
    "<form action='/store-user' method='post'><label>Your name</label><input type='text' name='username'><form>"
  );
});
app.post("/store-user", (req, res) => {
  const userName = req.body.username;

  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  existingUsers.push(userName);
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send("<h1>Username saved!</h1>");
});
app.get("/users", (req, res) => {
  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  let responseData = "<ul>";
  for (const user of existingUsers) {
    responseData += `<li>${user}</li>`;
  }
  res.send(responseData);
});

app.listen(4781);

// function handleRequest(request, response) {
//   if (request.url === "/currenttime") {
//     response.end(`<h1>${new Date()}<h1>`);
//   } else if (request.url === "/") {
//     response.statusCode = 200;
//     response.end("<h1>hello world!</h1>"); //response message(http가 종료될 때 보낼 메세지임)
//   }
// }
// const server = http.createServer(handleRequest);
// server.listen(4781);
