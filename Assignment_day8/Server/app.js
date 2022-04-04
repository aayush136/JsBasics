const http = require("http");
const fs = require("fs");
require('dotenv').config();
const port=process.env.PORT||3000;
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    
    const path = __dirname + "/static/index.html";
    fs.readFile(path, (err, data) => {
      if (err) {
        console.log(err);
        res.statusCode(500);
        res.setHeader("Content-Type", "text/html");
        res.end("<html><h1>Server side error</h1></html>");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      }
    });
  } else if (req.method === "POST" || req.url === "/echo") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(body);
      });
  } else {
    res.end("<html><body><h1>404 File Not Found</h1></body></html>");
  }
});
server.listen(port);