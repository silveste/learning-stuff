const fs = require('fs');
const routesHandler = (req,res) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);

  const url = req.url;
  switch (url) {
    case '/message':
    const body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      })
      req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFile('message.txt',message, (err) => {
          if (err) console.log('Upss!');
          res.statusCode = 302;
          res.setHeader('Location', '/');
          res.end();
        });
      });
      break;
    default:
      res.write(`
      <html>
        <head><title>Enter Message</title></head>
        <body>
          <h1>Enter Message</h1>
          <form action="/message" method="POST">
            <input name="message" type="text">
            <button type="submit">Send &raquo;</button>
          </form>
        </body>
      </html>
      `);
      res.end();
  }
}

module.exports = routesHandler;

/* Other way to export multiple leys
module.exports = {
  routes: routesHandler,
  otherFunction: otherFunction
}
*/

/*Another way
module.exports.routes = routesHandler;
module.exports.otherFunction = otherfunction
*/
