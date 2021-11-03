// import firebase from "firebase/compat/app";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration


  console.log("config connected");
  const firebaseConfig = {
    apiKey: "AIzaSyCs-9tQ7DpU22iIAzwg9A5runtRj9yj8Nk",
    authDomain: "comp1800-group.firebaseapp.com",
    projectId: "comp1800-group",
    storageBucket: "comp1800-group.appspot.com",
    messagingSenderId: "993666205533",
    appId: "1:993666205533:web:b731576d723bd78e22cab4"
  };

  
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();