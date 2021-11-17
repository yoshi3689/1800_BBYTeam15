console.log('connected')
const tipList = document.getElementById('dailyTips');
const storage = window.localStorage;

console.log(document.referrer)

const transferTip = e => {
    if (e.target.innerHTML.includes('<')) {
        const tipId = e
            .target
            .children
            .item(1)
            .id;
        console.log(tipId);
        // if the tip is not stored in the local storage, it creates a new tip key in
        // there
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

    firebase
        .auth()
        .onAuthStateChanged(user => {
            // Checks if user is signed in
            if (user) {
                currentUser = db
                    .collection("users")
                    .doc(user.uid);
                currentUser
                    .get()
                    .then(userDoc => {
                        userData = userDoc.data();
                        console.log(userData.personalPref);
                        if (userData.personalPref[0] == "Anywhere" && userData.personalPref[1] == "Both" && userData.personalPref[2] == "Under 5 min") {
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
            const tipFetched = db
                .collection('tips')
                .doc(`tip${randomNum}`);
            tipFetched
                .get()
                .then(collection => {
                    let tipData = collection.data();
                    document
                        .getElementById(`tip${index + 1}`)
                        .innerHTML = tipData.name;
                    console.log(randomNum)
                });
        }
    });
}

function fetchIndoorTips() {
    let tipListArray = Array.from(tipList.children);
    let indoorTips = [];
    let numbersFetched = [];
    // Search through all tips in database
    db
        .collection("tips")
        .get()
        .then(allTips => {
            allTips.forEach(doc => {
                // console.log(doc.data().type); If tip's type is inside, add it to list of
                // if tip is indoors, adds to indoorTips list
                if (doc.data().type.path == "types/inside") {
                    indoorTips.push(doc.data().id);
                }
            })
        })

    tipListArray.forEach((child, index) => {
        // get three random tips from the list of indoor tips

        // random number is the index of the tip in the indoorTips list
        const randomNum = Math.floor(Math.random() * (indoorTips.length - 1)) + 0;
        // checks if random number is already in the list
        if (!numbersFetched.find(num => num === randomNum)) {
            console.log("random: " + randomNum);
            numbersFetched.push(randomNum);
            // const randomTip = indoorTips[randomNum];
        }
        getTips(indoorTips, randomNum, index);
    })

    
    // });
}
// 1. an array of tips with a certain type
// 2.  
function getTips(tipArr, randomNum, index) {
  let tipAtIndex = tipArr[index];
  db.collection("tips").get()
    .then(allTips => {
      allTips.forEach(doc => {
        if (tipAtIndex == db.collection("tips").doc.id) {
          const tipFetched = db.collection('tips').doc(`tip${tipAtIndex}`);
          console.log(tipAtIndex, tipFetched);

          // tipFetched.get()
          //   .then(collection => {
          //     let tipData = collection.data();
          //     document.getElementById(`tip${tipAtIndex}`).innerHTML = tipData.name;
          // });
        }

      })
// if random number matches tip's id in database, display that tip on homepage
        // (x3)
      
      // console.log("random number list: " + numbersFetched);

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
            const tipFetched = db
                .collection('tips')
                .doc(`tip${randomNum}`);
            tipFetched
                .get()
                .then(collection => {
                    let tipData = collection.data();
                    document
                        .getElementById(`tip${index + 1}`)
                        .innerHTML = tipData.name;
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
            const tipFetched = db
                .collection('tips')
                .doc(`tip${randomNum}`);
            tipFetched
                .get()
                .then(collection => {
                    let tipData = collection.data();
                    document
                        .getElementById(`tip${index + 1}`)
                        .innerHTML = tipData.name;
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
            const tipFetched = db
                .collection('tips')
                .doc(`tip${randomNum}`);
            tipFetched
                .get()
                .then(collection => {
                    let tipData = collection.data();
                    document
                        .getElementById(`tip${index + 1}`)
                        .innerHTML = tipData.name;
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
            const tipFetched = db
                .collection('tips')
                .doc(`tip${randomNum}`);
            tipFetched
                .get()
                .then(collection => {
                    let tipData = collection.data();
                    document
                        .getElementById(`tip${index + 1}`)
                        .innerHTML = tipData.name;
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
            const tipFetched = db
                .collection('tips')
                .doc(`tip${randomNum}`);
            tipFetched
                .get()
                .then(collection => {
                    let tipData = collection.data();
                    document
                        .getElementById(`tip${index + 1}`)
                        .innerHTML = tipData.name;
                    console.log(randomNum)
                });
        }
    });
}

// document.addEventListener('DOMContentLoaded', fetchMainTips) const
// userName_ava = document.getElementById('user-name_avatar');