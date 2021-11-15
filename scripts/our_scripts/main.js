console.log('connected')
const tipList = document.getElementById('dailyTips');
const storage = window.localStorage;


console.log(document.referrer)

const transferTip = e => {
  if (e.target.innerHTML.includes('<')) {
    const tipId = e.target.children.item(1).id;
    console.log(tipId);
    // if the tip is not stored in the local storage, it creates a new tip key in there
    if (storage.getItem(tipId) == null) {
      storage.setItem(tipId, tipId);
      console.log(tipId + " stored successfully");
    }
  }
  
}

tipList.addEventListener('click', transferTip);
document.addEventListener('DOMContentLoaded', fetchPersonalTips);

// const tipList = document.getElementById('dailyTips');
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
  let tipListArray = Array.from(tipList.children);
  let indoorTips = [];
  // Search through all tips in database
  db.collection("tips").get()
  .then(allTips => {
    allTips.forEach(doc => {
      // If tip's type is inside, add it to list of indoorTips
      if (doc.data().type == "/types/inside") {
        // console.log(indoorTips);
        // console.log(doc.data().name);
        indoorTips.push(doc.data().id);
        // console.log("indoor tips loop: " + indoorTips);
      }
    })
    console.log("indoor tips: " + indoorTips);
    console.log("indoor tips list size: " + indoorTips.length);

    let numbersFetched = [];
    tipListArray.forEach((child, index) => {
       // randomize tips with size of indoorTips list
      const randomNum = Math.floor(Math.random() * (indoorTips.length - 1)) + 0;
      if (!numbersFetched.find(num => num === randomNum)) {
        numbersFetched.push(randomNum);
        const randomTip = indoorTips[randomNum];
        console.log("tip fetched " + randomTip);

        db.collection("tips").get()
        .then(allTips => {
          allTips.forEach(doc => {

            if (indoorTips[randomNum] == doc.data().id) {

              const tipFetched = db.collection('tips').doc(`tip${randomNum}`);
              // const tipFetched = randomTip;
              tipFetched.get().then(collection => {
              let tipData = collection.data();
              document.getElementById(`tip${index + 1}`).innerHTML = tipData.name;
              console.log(randomNum)
            });
            }

          })
        })

      }
  });

  })
 
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



// const userName_ava = document.getElementById('user-name_avatar');