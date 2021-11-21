const tipList = document.getElementById('dailyTips');
const storage = window.localStorage;
let tipArrToDisplay = [];
const dailyTips = document.getElementById('dailyTips');
const collection = 'tips';

let currentUser;
let currentUserInfo;

function fetchTips() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then(userDoc => {
        currentUserInfo = userDoc.data();

        // if the user already has personal tips...
        if (currentUserInfo.personalTips) {
          // fetch tips using only the personalTipNums
          db.collection("tips").get().then(allTips => {
            allTips.forEach(doc => {
              const tip = doc.data();
              const id = tip.id;
              if (currentUserInfo.personalTips.find(personalTipNum => personalTipNum === id)) {
                const name = tip.name;
                const docId = doc.id;
                const categories = tip.categories.id;
                const type = tip.type.id;
                const time = tip.time.id;
                const image = tip.image;

                tipArrToDisplay.push({
                  name,
                  id,
                  categories,
                  type,
                  time,
                  image,
                  docId
                });
              }
            })
            insertTips(tipArrToDisplay);
          })
        } else {
          userPref = userDoc.data().personalPref;
          fetchAllTips((arr) => {
            getFromGeneral(arr, userPref, insertTips);
          });
        }

      });
    }
  });
}

function savePersonalTips(tipArrDisplaying) {
  console.log(currentUserInfo)
  if (!currentUserInfo.personalTips) {
    const tipIds = tipArrDisplaying.map(tip => {
      return tip.id;
    });

    currentUser.update({
      personalTips: tipIds,
    });
  } else {
    console.log("you already have personal tips");
  }
}

// based on the tip array passed as an argument, it assigns a randomized tip to the array to display
function getThreeRandomizedTips(tipArr) {
  let randomNumRecords = [];
  let i = 0;
  while (i !== 3) {
    const randomNum = Math.floor(Math.random() * (tipArr.length));
    tipArr.forEach((tip, index) => {
      // if the random num matches with an index in the array..
      if (index === randomNum && !randomNumRecords.find(numToCheck => numToCheck === randomNum)) {
        // add the item to the array to display
        tipArrToDisplay.push(tip);
        // the counter increments only when the above condition is met
        i++;
      }
    })
    randomNumRecords.push(randomNum);
  }
}

// insert each item in the array into each corresponding label element
function insertTips(arrToDisplay) {
  arrToDisplay.forEach((tip, index) => {
    // console.log(tip.id);
    const eachTip = document.getElementById(`tip${index + 1}`);
   
    console.log(eachTip.previousElementSibling);
    eachTip.classList.add(tip.id);
    eachTip.innerText = tip.name;

    // setting a new href for each tip being displayed
    // anchor tag: eachTip.parentElement.parentElement
    let hrefToSet = "details.html?collection=tips&id=" + tip.docId;
    eachTip.parentElement.parentElement.setAttribute("href", hrefToSet);

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
    eachTip.previousElementSibling.setAttribute('src', "/" + tip.image);
    // console.log(tip.docId);
  })
  savePersonalTips(arrToDisplay);
}

// send the details of the tip clicked to the page he user is navigating to
// const transferTip = e => {
//     if (e.target.innerHTML.includes('<')) {
//         const tipId = e
//             .target
//             .children
//             .item(1)
//             .id;
//         console.log(tipId);
//         // if the tip is not stored in the local storage, it creates a new tip key in
//         // there
//         if (storage.getItem(tipId) == null) {
//             storage.setItem(tipId, tipId);
//             console.log(tipId + " stored successfully");
// eachTip.parentElement.href = "details.html?collection="+collection+"?id=" + docId;
//         }
//     }
// }
// tipList.addEventListener('click', transferTip);
document.addEventListener('DOMContentLoaded', fetchTips);

let userData;
let tips = db.collection('tips');

function fetchAllTips(callback) {
  let generalTipArr = [];
  db.collection("tips").get().then(allTips => {
    allTips.forEach(doc => {
      const tip = doc.data();
      const id = tip.id;
      const name = tip.name;
      const docId = doc.id;
      const categories = tip.categories.id;
      const type = tip.type.id;
      const time = tip.time.id;
      const image = tip.image;

      // populating the general tip list with all the tips 
      generalTipArr.push({
        name,
        id,
        categories,
        type,
        time,
        image,
        docId
      });
    })

    // checking which tip was fetched
    // generalTipArr.forEach(tip => {
    //   console.log(`tip ${tip.id} ${tip}`);
    // })

    // make sure that fetchAllTIps is called after the generalTipArr is populated
    // by the below line of code
    callback(generalTipArr);
  })
}

// before this function is invoked, all the tips are assigned to an array
// so that you can loop through them without making an API call to the database
function getFromGeneral(tipArr, preferences, callback) {
  // in this case, from 0 to 7 so that the numbers match with each index of the array
  if (preferences[0] == "Anywhere" && preferences[1] == "Both") {
    getThreeRandomizedTips(tipArr);
  } else {
    let typeStringUser = preferences[0].toLowerCase();
    let categoriesStringUser = preferences[1].toLowerCase();
    let withoutUnder = preferences[2].replace("Under ", "");
    let timeStringUser = withoutUnder.replace(" min", "");
    let sortedTipArr = [];

    // console.log(tipArr[0].categories, tipArr[0].type, tipArr[0].time)

    tipArr.forEach((tip) => {
      let typeString = tip.type;
      let categoriesString = tip.categories;
      let timeString = tip.time;

      // either the types is set to anywhere(indooor or outdoor) or the categories is set to Both(physical or mental)
      // when only the categories can be ignored
      if (preferences[0] === "Anywhere" || preferences[1] !== "Both") {
        if (timeString === timeStringUser && categoriesString === categoriesStringUser) {
          sortedTipArr.push(tip);
        }

        // when only the type can be ignored
      } else if (preferences[0] !== "Anywhere" || preferences[1] === "Both") {
        if (timeString === timeStringUser && typeString === typeStringUser) {
          sortedTipArr.push(tip);
        }
      } else {
        // only when all the three preferences match with those of a tip...
        if (timeString === timeStringUser && categoriesString === categoriesStringUser &&
          typeString === typeStringUser) {
          sortedTipArr.push(tip);
        }
      }
    })
    console.log(sortedTipArr);
    if (sortedTipArr.length >= 3) {
      getThreeRandomizedTips(sortedTipArr);
    }
  }

  // insertTips
  callback(tipArrToDisplay);
}



// let tipListArray = Array.from(tipList.children);
// let numbersFetched = [];
// tipListArray.forEach((child, index) => {
//     const randomNum = Math.floor(Math.random() * 6) + 1;
//     if (!numbersFetched.find(num => num === randomNum)) {
//         numbersFetched.push(randomNum);
//         const tipFetched = db
//             .collection('tips')
//             .doc(`tip${randomNum}`);
//         tipFetched
//             .get()
//             .then(collection => {
//                 let tipData = collection.data();
//                 document
//                     .getElementById(`tip${index + 1}`)
//                     .innerHTML = tipData.name;
//                 console.log(randomNum)
//             });
//     }
// });

// function fetchIndoorTips() {
//   let tipListArray = Array.from(tipList.children);
//   let indoorTips = [];
//   // Search through all tips in database
//   db.collection("tips").get()
//   .then(allTips => {
//     allTips.forEach(doc => {
//       // If tip's type is inside, add it to list of indoorTips
//       if (doc.data().type == "/types/inside") {
//         console.log(doc.data().name);
//         indoorTips.push(doc.data().name);
//       }
//     })
//   })
//   console.log("indoor tips: " + indoorTips);
//   console.log("indoor tips list size: " + indoorTips.length);
//     // let tipListArray = Array.from(tipList.children);
//     // let indoorTips = [];
//     let numbersFetched = [];
//     // Search through all tips in database
//     db
//         .collection("tips")
//         .get()
//         .then(allTips => {
//             allTips.forEach(doc => {
//                 // console.log(doc.data().type); If tip's type is inside, add it to list of
//                 // if tip is indoors, adds to indoorTips list
//                 if (doc.data().type.path == "types/inside") {
//                     indoorTips.push(doc.data().id);
//                 }
//             })
//         })


//     tipListArray.forEach((child, index) => {
//         // get three random tips from the list of indoor tips

//         // random number is the index of the tip in the indoorTips list
//         const randomNum = Math.floor(Math.random() * (indoorTips.length - 1)) + 0;
//         // checks if random number is already in the list
//         if (!numbersFetched.find(num => num === randomNum)) {
//             console.log("random: " + randomNum);
//             numbersFetched.push(randomNum);
//             // const randomTip = indoorTips[randomNum];
//         }
//         getTips(indoorTips, randomNum, index);
//     })


//     // });
// }
// // 1. an array of tips with a certain type
// // 2.  
// function getTips(tipArr, randomNum, index) {
//   let tipAtIndex = tipArr[index];
//   db.collection("tips").get()
//     .then(allTips => {
//       allTips.forEach(doc => {
//         if (tipAtIndex == db.collection("tips").doc.id) {
//           const tipFetched = db.collection('tips').doc(`tip${tipAtIndex}`);
//           console.log(tipAtIndex, tipFetched);

//           // tipFetched.get()
//           //   .then(collection => {
//           //     let tipData = collection.data();
//           //     document.getElementById(`tip${tipAtIndex}`).innerHTML = tipData.name;
//           // });
//         }

//       })
// // if random number matches tip's id in database, display that tip on homepage
//         // (x3)

//       // console.log("random number list: " + numbersFetched);

//   })
// }

// function fetchOutdoorTips() {
//     // for now just fetching the tip1, 2, 3 from the database
//     let tipListArray = Array.from(tipList.children);
//     let numbersFetched = [];
//     tipListArray.forEach((child, index) => {
//         const randomNum = Math.floor(Math.random() * 6) + 1;
//         if (!numbersFetched.find(num => num === randomNum)) {
//             numbersFetched.push(randomNum);
//             const tipFetched = db
//                 .collection('tips')
//                 .doc(`tip${randomNum}`);
//             tipFetched
//                 .get()
//                 .then(collection => {
//                     let tipData = collection.data();
//                     document
//                         .getElementById(`tip${index + 1}`)
//                         .innerHTML = tipData.name;
//                     console.log(randomNum)
//                 });
//         }
//     });
// }

// function fetchPhysicalTips() {
//     // for now just fetching the tip1, 2, 3 from the database
//     let tipListArray = Array.from(tipList.children);
//     let numbersFetched = [];
//     tipListArray.forEach((child, index) => {
//         const randomNum = Math.floor(Math.random() * 6) + 1;
//         if (!numbersFetched.find(num => num === randomNum)) {
//             numbersFetched.push(randomNum);
//             const tipFetched = db
//                 .collection('tips')
//                 .doc(`tip${randomNum}`);
//             tipFetched
//                 .get()
//                 .then(collection => {
//                     let tipData = collection.data();
//                     document
//                         .getElementById(`tip${index + 1}`)
//                         .innerHTML = tipData.name;
//                     console.log(randomNum)
//                 });
//         }
//     });
// }

// function fetchMentalTips() {
//     // for now just fetching the tip1, 2, 3 from the database
//     let tipListArray = Array.from(tipList.children);
//     let numbersFetched = [];
//     tipListArray.forEach((child, index) => {
//         const randomNum = Math.floor(Math.random() * 6) + 1;
//         if (!numbersFetched.find(num => num === randomNum)) {
//             numbersFetched.push(randomNum);
//             const tipFetched = db
//                 .collection('tips')
//                 .doc(`tip${randomNum}`);
//             tipFetched
//                 .get()
//                 .then(collection => {
//                     let tipData = collection.data();
//                     document
//                         .getElementById(`tip${index + 1}`)
//                         .innerHTML = tipData.name;
//                     console.log(randomNum)
//                 });
//         }
//     });
// }

// function fetch15MinTips() {
//     // for now just fetching the tip1, 2, 3 from the database
//     let tipListArray = Array.from(tipList.children);
//     let numbersFetched = [];
//     tipListArray.forEach((child, index) => {
//         const randomNum = Math.floor(Math.random() * 6) + 1;
//         if (!numbersFetched.find(num => num === randomNum)) {
//             numbersFetched.push(randomNum);
//             const tipFetched = db
//                 .collection('tips')
//                 .doc(`tip${randomNum}`);
//             tipFetched
//                 .get()
//                 .then(collection => {
//                     let tipData = collection.data();
//                     document
//                         .getElementById(`tip${index + 1}`)
//                         .innerHTML = tipData.name;
//                     console.log(randomNum)
//                 });
//         }
//     });
// }

// function fetch30MinTips() {
//     // for now just fetching the tip1, 2, 3 from the database
//     let tipListArray = Array.from(tipList.children);
//     let numbersFetched = [];
//     tipListArray.forEach((child, index) => {
//         const randomNum = Math.floor(Math.random() * 6) + 1;
//         if (!numbersFetched.find(num => num === randomNum)) {
//             numbersFetched.push(randomNum);
//             const tipFetched = db
//                 .collection('tips')
//                 .doc(`tip${randomNum}`);
//             tipFetched
//                 .get()
//                 .then(collection => {
//                     let tipData = collection.data();
//                     document
//                         .getElementById(`tip${index + 1}`)
//                         .innerHTML = tipData.name;
//                     console.log(randomNum)
//                 });
//         }
//     });
// }

// // document.addEventListener('DOMContentLoaded', fetchAllTips) const
// // userName_ava = document.getElementById('user-name_avatar');