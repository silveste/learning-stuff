const fs = require('fs');

exports.deleteFile = (filePath) => {
  console.log('Aquiiii');
  fs.unlink(filePath, (err) => {
    if (err) {

      throw (err);
    }
  })
}
