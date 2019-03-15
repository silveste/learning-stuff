const functions = require('firebase-functions');
const admin = require('firebase-admin'); // Required to validate token
const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4')

const gcConfig = {
  projectId: 'rncourse-d2df3',
  keyFilename: 'firebase-key.json' //File not included in the repository
}
const gcs = require('@google-cloud/storage')(gcConfig);

admin.initializeApp({
  credential: admin.credential.cert(require('./firebase-key.json')),
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.saveImage = functions.https.onRequest((request, response) => {
 cors(request, response, () => {
  if (
    !request.headers.authorization
    || !request.headers.authorization.startsWith('Bearer')) {
    console.log('Invalid token')
    response.status(403).json({error:'Unauthorized'});
    return;
  }
  const idToken = request.headers.authorization.split('Bearer ')[1];
  console.log(idToken);
  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      const body = JSON.parse(request.body);
      fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
        console.log(err);
        return response.status(500).json({error: err});
      });
      const bucket = gcs.bucket('rncourse-d2df3.appspot.com');
      const uuid = UUID();
      bucket.upload('/tmp/uploaded-image.jpg', {
        uploadType: 'media',
        destination: '/places/' + uuid + '.jpg',
        metadata: {
          metadata: {
            contentType: 'image/jpeg',
            firebaseStorageDownloadTokens: uuid
          }
        }
      }, (err, file) => {
        if(!err) {
          response.status(201).json({
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' +
              bucket.name +
              '/o/' +
              encodeURIComponent(file.name) +
              '?alt=media&token=' +
              uuid
          });
        } else {
          console.log(err);
          response.status(500).json({error: err});
        }
      });
      return;
    })
    .catch(error => {
      console.log('Token invalid');
      response.status(403).json({error:'Unauthorized'});
    });
 });
});
