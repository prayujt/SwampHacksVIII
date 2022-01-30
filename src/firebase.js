// import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDAtRciaVOWwMSlpAxQR7Epu5sfbPlV0hk',
//   authDomain: 'swamphacksviii.firebaseapp.com',
//   databaseURL: 'https://swamphacksviii-default-rtdb.firebaseio.com',
//   projectId: 'swamphacksviii',
//   storageBucket: 'swamphacksviii.appspot.com',
//   messagingSenderId: '543534194983',
//   appId: '1:543534194983:web:8a0992caa35b68ac2bc902',
//   measurementId: 'G-YJQPMS0NB8'
// };

// const app = initializeApp(firebaseConfig);

// const database = getDatabase(app);

var admin = require("firebase-admin");
var admin_app = require("firebase-admin/app");

admin.initializeApp({
  credential: admin_app.applicationDefault(),
  databaseURL: "https://swamphacksviii-default-rtdb.firebaseio.com",
});

exports.database = admin.database();
