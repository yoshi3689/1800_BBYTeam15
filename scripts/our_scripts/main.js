console.log('hello, it is main');

const tipList = document.getElementById('dailyTips');
let currentUser;
let userData;
let tips = db.collection('tips');

function fetchPersonalTips() {
  // for now just fetching the tip1, 2, 3 from the database

  firebase.auth().onAuthStateChanged(user => {
    // Checks if user is signed in
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get()
        .then(userDoc => {
          userData = userDoc.data();
          console.log(userData.personalPref);
          if (userData.personalPref[0] == "Anywhere" 
            && userData.personalPref[1] == "Both"
            && userData.personalPref[2] == "Under 5 min") {
              fetchMainTips();
          } else if (userData.personalPref[0] == "Indoor") {
              fetchIndoorTips();
          } else if (userData.personalPref[0] == "Outdoor") {
              fetchOutdoorTips();
          } else if (userData.personalPref[1] == "Physical") {
            fetchPhysicalTips();
          } else if (userData.personalPref[1] == "Mental") {
            fetchMentalTips();
          } else if (userData.personalPref[2] == "Under 15 min") {
            fetch15MinTips();
          } else if (userData.personalPref[2] == "Under 30 min") {
            fetch30MinTips();
          }

        })
    }
  })
}

function fetchMainTips() {
  // for now just fetching the tip1, 2, 3 from the database
  let tipListArray = Array.from(tipList.children);
  let numbersFetched = [];
    tipListArray.forEach((child, index) => {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      if (!numbersFetched.find(num => num === randomNum)) {
        numbersFetched.push(randomNum);
        const tipFetched = db.collection('tips').doc(`tip${randomNum}`);
        tipFetched.get().then(collection => {
        let tipData = collection.data();
        document.getElementById(`tip${index + 1}`).innerHTML = tipData.name;
        console.log(randomNum)
        });
      }
  });
}

function fetchIndoorTips() {
  // for now just fetching the tip1, 2, 3 from the database
  // let tipListArray = Array.from(tipList.children);
  let indoorTips;
  // console.log(tips.doc('tip1').data().type);

  if (tips.where("type", "==", "/types/inside")) {
    

  }

  let numbersFetched = [];
    tipListArray.forEach((child, index) => {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      if (!numbersFetched.find(num => num === randomNum)) {
        numbersFetched.push(randomNum);
        const tipFetched = db.collection('tips').doc(`tip${randomNum}`);
        tipFetched.get().then(collection => {
        let tipData = collection.data();
        document.getElementById(`tip${index + 1}`).innerHTML = tipData.name;
        console.log(randomNum)
        });
      }
  });
}

function fetchOutdoorTips() {
  // for now just fetching the tip1, 2, 3 from the database
  let tipListArray = Array.from(tipList.children);
  let numbersFetched = [];
    tipListArray.forEach((child, index) => {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      if (!numbersFetched.find(num => num === randomNum)) {
        numbersFetched.push(randomNum);
        const tipFetched = db.collection('tips').doc(`tip${randomNum}`);
        tipFetched.get().then(collection => {
        let tipData = collection.data();
        document.getElementById(`tip${index + 1}`).innerHTML = tipData.name;
        console.log(randomNum)
        });
      }
  });
}

function fetchPhysicalTips() {
  // for now just fetching the tip1, 2, 3 from the database
  let tipListArray = Array.from(tipList.children);
  let numbersFetched = [];
    tipListArray.forEach((child, index) => {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      if (!numbersFetched.find(num => num === randomNum)) {
        numbersFetched.push(randomNum);
        const tipFetched = db.collection('tips').doc(`tip${randomNum}`);
        tipFetched.get().then(collection => {
        let tipData = collection.data();
        document.getElementById(`tip${index + 1}`).innerHTML = tipData.name;
        console.log(randomNum)
        });
      }
  });
}

function fetchMentalTips() {
  // for now just fetching the tip1, 2, 3 from the database
  let tipListArray = Array.from(tipList.children);
  let numbersFetched = [];
    tipListArray.forEach((child, index) => {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      if (!numbersFetched.find(num => num === randomNum)) {
        numbersFetched.push(randomNum);
        const tipFetched = db.collection('tips').doc(`tip${randomNum}`);
        tipFetched.get().then(collection => {
        let tipData = collection.data();
        document.getElementById(`tip${index + 1}`).innerHTML = tipData.name;
        console.log(randomNum)
        });
      }
  });
}

function fetch15MinTips() {
  // for now just fetching the tip1, 2, 3 from the database
  let tipListArray = Array.from(tipList.children);
  let numbersFetched = [];
    tipListArray.forEach((child, index) => {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      if (!numbersFetched.find(num => num === randomNum)) {
        numbersFetched.push(randomNum);
        const tipFetched = db.collection('tips').doc(`tip${randomNum}`);
        tipFetched.get().then(collection => {
        let tipData = collection.data();
        document.getElementById(`tip${index + 1}`).innerHTML = tipData.name;
        console.log(randomNum)
        });
      }
  });
}

function fetch30MinTips() {
  // for now just fetching the tip1, 2, 3 from the database
  let tipListArray = Array.from(tipList.children);
  let numbersFetched = [];
    tipListArray.forEach((child, index) => {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      if (!numbersFetched.find(num => num === randomNum)) {
        numbersFetched.push(randomNum);
        const tipFetched = db.collection('tips').doc(`tip${randomNum}`);
        tipFetched.get().then(collection => {
        let tipData = collection.data();
        document.getElementById(`tip${index + 1}`).innerHTML = tipData.name;
        console.log(randomNum)
        });
      }
  });
}

// document.addEventListener('DOMContentLoaded', fetchMainTips)

document.addEventListener('DOMContentLoaded', fetchPersonalTips)

// const userName_ava = document.getElementById('user-name_avatar');