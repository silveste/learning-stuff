const http = require('http');

const server = http.createServer((req,res) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);
  //process.exit();
  res.setHeader('Content-Type','text/html');
  res.write(`
  <html>
    <head><title>Node Server</title></head>
    <body><h1>Hello from Node</h1>
  </html>
  `);
  res.end();
});

server.listen(3000);
