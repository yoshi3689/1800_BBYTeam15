const tipList = document.getElementById('dailyTips');
const storage = window.localStorage;
let tipArrToDisplay = [];

const collection = 'tips';

// what do i need? 
// 1.create an array to store tips to display l=3
// 2.fetch all the tips and add them to an array () l=8
// 3.extract a specific type of tips and add them to another array () l=x
// 4.generate a random number using the length of the type specific array () rand=x.length
// 5.prevent the random number from being duplicated
// 6.iterate through the array from no.1

// what haven't I done yet?
// 1. insert a new href value to the parent of each tip name
// 2. filtering 

function fetchPersonalTips() {
  // for now just fetching the tip1, 2, 3 from the database
  firebase.auth().onAuthStateChanged(user => {
          // Checks if user is signed in
          if (user) {

              currentUser = db
                  .collection("users")
                  .doc(user.uid);
                  
              currentUser
                  .get()
                  .then(userDoc => {
                      userPref = userDoc.data().personalPref;
                      console.log(userPref);
                      fetchAllTips((arr) => {
                        getFromGeneral(arr, userPref ,insertTips)
                      });
                  })
          }
      })
}

// based on the tip array passed as an argument, it assigns a randomized tip to the array to display
function getThreeRandomizedTips(tipArr) {
  let randomNumRecords = [];
  let i = 0;
  while(i !== 3) {
    const randomNum = Math.floor(Math.random() * (tipArr.length));
      tipArr.forEach((tip, index) => {
      // if the random num matches with an index in the array..
      if (index === randomNum && !randomNumRecords.find(numToCheck => numToCheck === randomNum)) {
        console.log(tip.name);
        // add the item to the array to display
        tipArrToDisplay.push(tip);
        // the counter increments only when the above condition is met
        i++;
      }
    })
    randomNumRecords.push(randomNum);
  }
}

// insert each item in the array into the corresponding label element
function insertTips(arrToDisplay) {
  arrToDisplay.forEach((tip, index) => {
    console.log(tip.id);
    const eachTip = document.getElementById(`tip${index + 1}`);
    eachTip.innerText = tip.name;
    console.log(tip.docId);

    // we have to figure out a way to reference the parent element of each tip name element
    // in HTML so that we can add a link to the parent(a tag). This enables the user to navigate to the 
    // details of the specific tip

    // eachTip.parentElement.href = "details.html?collection="+collection+"?id=" + docId;
  })
}


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

function fetchAllTips(callback) {
  let generalTipArr = [];
    db.collection("tips").get().then(allTips => {
      allTips.forEach(doc => {

        // console.log(doc.data().categories.id);
        const name = doc.data().name;
        const id = doc.data().id;
        const docId = doc.id;
        const categories = doc.data().categories.id;
        const type = doc.data().type.id;
        const time = doc.data().time.id;
        // this part might change as we add an image to each tip doc on firebase
        // we'll figure out how to do that
        const image = doc.data().image;

        // populating the general tip list with all the tips 
        generalTipArr.push({name, id, categories, type, time, image, docId});
      })
      generalTipArr.forEach(tip => {
        console.log(`tip ${tip.id} ${tip}`);
      })

      // make sure that fetchAllTIps is called after the generalTipArr is populated
      // by the below line of code
      callback(generalTipArr);
    })
}
        // const name = doc.data().name;
        // const id = doc.data().id;
        // const docId = doc.id;
        // const categories = doc.data().categories;
        // const type = doc.data().type.path;
        // const time = doc.data().time.path;
        // const image = doc.data().image;

// before this function is invoked, all the tips are assigned to an array
// so that you can loop through them without making an API call to the database
function getFromGeneral(tipArr, preferences ,callback) {
  // console.log("getgeneral working");
  // in this case, from 0 to 7 so that the numbers match with each index of the array

  // console.log(preferences);
  // console.log(tipArr);
  if (preferences[0] == "Anywhere" && preferences[1] == "Both" && preferences[2] == "Under 5 min") {
    getThreeRandomizedTips(tipArr);
  } else {
    let typeStringUser = preferences[0].toLowerCase();
      let categoriesStringUser = preferences[1].toLowerCase();
      let timeStringUser = preferences[2].replace("Under ", "") + preferences[2].replace(" min", "");
    let sortedTipArr = [];
    tipArr.forEach((tip) => {
      let typeString = tip.type;
      let categoriesString = tip.categories;
      let timeString = tip.time;
  
      

      // either the types is set to anywhere(indooor or outdoor) or the categories is set to Both(physical or mental)
      if (preferences[0] === "Anywhere" || preferences[1] === "Both") {
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
        }
      } else {
        // only when all the three preferences match with those of a tip...
        if (timeString === timeStringUser && categoriesString === categoriesStringUser 
          && typeString === typeStringUser) {

            // console.log(timeString === timeStringUser && categoriesString === categoriesStringUser 
            // && typeString === typeStringUser);
            // console.log("tip-info:" + timeString, "user-pref:" + timeStringUser);
            // console.log("tip-info:" + categoriesString, "user-pref:" + categoriesStringUser);
            // console.log("tip-info:" + typeString, "user-pref:" + categoriesStringUser);
            sortedTipArr.push(tip);
          }
      }
      getThreeRandomizedTips(sortedTipArr);
    })
  }
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