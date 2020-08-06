const mariadb = require('mariadb');

const pool = mariadb.createPool({
  //SERVER CONF: User 'node-course-student' is limited to use only node-complete database on only localhost
  host: 'localhost',
  user: 'node-course-student',
  password: 'nodeStudent.',
  database: 'node-complete'
});

module.exports = pool;
