const _htmlWrapper = (innerHtml) => {
  return `
    <html>
      <head><title>Assignment 1</title></head>
      <body>
        ${innerHtml}
      </body>
    </html>`;
}
const users = [];
module.exports = (req,res) => {
  const { url } = req;
  let inner;
  switch (url) {
    case '/users':
      const usersList = users.map(val => `<li>${val}</li>`);
      usersList.unshift('<ul>');
      usersList.push('</ul>');
      const zeroUsers = `<p>No users yet</p>`
      inner = `
      <a href="/">Home</a>
      ${users.length === 0 ? zeroUsers : usersList.join('')}
      `;
      res.write(_htmlWrapper(inner));
      res.end();
      break;
    case '/create-user':
      const body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      });
      req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const user = parsedBody.split('=')[1];
        users.push(user);
        res.statusCode = 302;
        res.setHeader('Location', '/users');
        res.end();
        });
      break;
    default:
      inner = `
      <a href="/users">Users</a>
      <h1>Hello!</h1>
      <form action="/create-user" method="POST">
        <input name="user" type="text">
        <button type="submit">Send &raquo;</button>
      </form>`;
      res.write(_htmlWrapper(inner));
      res.end();
  }
}
