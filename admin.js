var admin = require("firebase-admin");

var serviceAccount = require("./public/tradie-safe-notification-firebase-adminsdk-kmi1a-b8e2e2b712.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// This registration token comes from the client FCM SDKs.
const registrationToken = 'faNcFRnSLxxrFhmhxiQJ2_:APA91bEc05eZFcBTm5eEDMqysjyTaUmyYueer3R6XvsssnEZYlp0UiM1V5TQjX143Lyy-62QUgZBMS6XSwrjFjcNyHk8_ZZ1bjiSHgQNvTDDYLny2kwCZmPrhSCNenaAXuekhFUGwaOQ'

const message = {
    notification: {
    title: 'Iam Rohit',
    body: 'how are you'
  },
//   webpush: {
//     fcmOptions: {
//       link: '/?breakingnews'
//     }
//   },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });