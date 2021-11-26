const storage = window.localStorage;
const dailyTips = document.getElementById('dailyTips');
const collection = 'tips';


let currentUser;
let currentUserInfo;

// var tipArrToDisplay;

// generate three random numbers
const getThreeRandomNums = (arr) => {
  let randomNumRecords = [];
  let i = 0;
  while (i !== 3) {
    const randomNum = Math.floor(Math.random() * (arr.length)) + 1;
    if (randomNumRecords.find(num => num != randomNum)) {
      randomNumRecords.push(randomNum);
      i++;
    }
  }
  return randomNumRecords;
}

function fetchTips() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.onSnapshot(userDoc => {
        currentUserInfo = userDoc.data();
        console.log(currentUserInfo);

        const personalPref = currentUserInfo.personalPref;
        console.log(personalPref);

        // working
        // 1.no preference
        // check if you are getting all sorts of tips
        if (personalPref[0] == "Anywhere" && personalPref[1] == "Both" && personalPref[2] == "Any") {
          console.log("check if you are getting all sorts of tips");
          getAnyTips();
        }
        // working
        // 2.anywhere && any
        // check if you are getting tips filtered by categories
        else if (personalPref[0] == "Anywhere" && personalPref[1] != "Both" && personalPref[2] == "Any") {
          console.log("heck if you are getting tips filtered by categories");
        }
        // working
        // 3.both && anywhere
        // check if you are getting tips filtered by time
        else if (personalPref[0] == "Anywhere" && personalPref[1] == "Both" && personalPref[2] != "Any") {
          console.log("check if you are getting tips filtered by time");
        }

        // working
        // 4. both and any
        // check if you are getting tips filtered by type
        else if (personalPref[0] != "Anywhere" && personalPref[1] == "Both" && personalPref[2] == "Any") {
          console.log("check if you are getting tips filtered by type");
        }

        // working
        // 5.
        // filtering categories and type
        else if (personalPref[0] != "Anywhere" && personalPref[1] != "Both" && personalPref[2] == "Any") {
          console.log("filtering categories and type");
          }
          // working
          // 6. anywhere
          // check if you are getting tips filtered by categories and time
          else if (personalPref[0] == "Anywhere" && personalPref[1] != "Both" && personalPref[2] != "Any") {
            console.log("check if you are getting tips filtered by categories and time");
          } 
          // working
          // 7. both 
          // check if you are getting tips filtered by type and time
          else if (personalPref[0] != "Anywhere" && personalPref[1] == "Both" && personalPref[2] != "Any") {
            console.log("check if you are getting tips filtered by type and time");
          }
          
          // 7. all filters are set
          else {
            console.log("all filters are set");
          }


      })
    }


  });
}

// a motherboard that runs all the functions related to fetching tips

// function fetchTips() {
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       currentUser = db.collection("users").doc(user.uid);
//       currentUser.onSnapshot(userDoc => {
//         currentUserInfo = userDoc.data();
//         // if the user has any preference
//         // generate three random numbers and fetch tips according to their values
//         // if the user already has personal tips and the length of the array is not 0
//         if (currentUserInfo.personalTips && currentUserInfo.personalTips.length != 0) {
//           let tipArrToDisplay = [];
//           // fetch tips using only the personalTipNums
//           db.collection("tips").where("time", "==" , "5").get().then(allTips => {
//             // if there's any tip to display, run the forEach
//             allTips.forEach(doc => {

//               console.log(doc.data());

//               const tip = doc.data();
//               const id = tip.id;
//               if (currentUserInfo.personalTips.find(personalTipNum => personalTipNum === id)) {
//                 const name = tip.name;
//                 const docId = doc.id;
//                 const categories = tip.categories.id;
//                 const type = tip.type;
//                 const time = tip.time;
//                 const image = tip.image;

//                 tipArrToDisplay.push({
//                   name,
//                   id,
//                   categories,
//                   type,
//                   time,
//                   image,
//                   docId
//                 });
//               }
//             })
//             // asks the user if they want to get moe tips or not
//             // console.log("no tip to show at the moment");

//             insertTips(tipArrToDisplay);
//           })
//         } 
//         // if the user runs out of all the personal tips 
//         // else {
//         //     console.log("no tip to show now");
//         //   if (window.confirm("Do you want more tips??")) {
//         //       userPref = userDoc.data().personalPref;
//         //       fetchAllTips((arr) => {
//         //       getFromGeneral(arr, userPref, insertTips);
//         //     });
//         //   }
//         // }
//       })
//     }
//   });
// }

// the below should work 
// when the length is 0
// console.log(currentUserInfo.personalTips, tip.id, "  ");
// currentUser.update({
//   personalTips: [...currentUserInfo.personalTips, tip.id]
// });
function savePersonalTips(tipArrDisplaying) {
  console.log(currentUserInfo)
  if (!currentUserInfo.personalTips || currentUserInfo.personalTips.length == 0) {
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
// function getThreeRandomizedTips(tipArr) {
//   let randomNumRecords = [];
//   let i = 0;
//   while (i !== 3) {
//     const randomNum = Math.floor(Math.random() * (tipArr.length));
//     tipArr.forEach((tip, index) => {
//       // if the random num matches with an index in the array..
//       if (index === randomNum && !randomNumRecords.find(numToCheck => numToCheck === randomNum)) {

//         // hfaglbal have to fix
//         i++;
//       }
//     })
//     randomNumRecords.push(randomNum);
//   }
// }

// by the time this function is invoked, the size of the array should be
// shrank down to three
// insert each item in the array into each corresponding label element
function insertTips(arrToDisplay) {
  dailyTips.innerHTML = "";
  arrToDisplay.forEach((tip, index) => {
    // console.log(tip.id);
    const newTip = document.createElement("li");
    newTip.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
    newTip.setAttribute("id", `tip${index + 1}`)

    let hrefToSet = "details.html?collection=tips&id=" + tip.docId;
    // eachTip.parentElement.parentElement.setAttribute("href", hrefToSet);

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
    let srcToSet = "/" + tip.image;
    // eachTip.previousElementSibling.setAttribute("src", "/" + tip.image);
    // console.log(tip.docId);
    newTip.innerHTML = `
                <a href="${hrefToSet}" class="d-block wrapper">
                    <div class="d-flex justify-content-between align-items-center">
                        <img src="${srcToSet}" class="thumbnail-image" alt="walking" />
                        <p class="label ${tip.id}" id="tip1">${tip.name}</p>
                    </div>
                </a>
                <div class="d-flex align-items-center">
                    <div class="btn-space">
                        <button type="button" class="btn btn-success btn-sm complete">
                            <svg xmlns="http://www.w3.org/2000/svg" style="color:white" width="20" height="20"
                                fill="currentColor" class="bi bi-check-lg" viewbox="0 0 16 16">
                                <path
                                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                        </button>
                    </div>
                    <button type="button" class="btn btn-danger delete btn-sm btn-size">𝗫</button>
                </div>
    `
    dailyTips.appendChild(newTip);
  })
  savePersonalTips(arrToDisplay);
}

// fill up the 

document.addEventListener('DOMContentLoaded', fetchTips);

// let userData;
// let tips = db.collection('tips');


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
  //for some reason, nothing is added to sortedTipArr;
  // in this case, from 0 to 7 so that the numbers match with each index of the array
  if (preferences[0] == "Anywhere" && preferences[1] == "Both") {
    getThreeRandomizedTips(tipArr);
  } else {
    let typeStringUser = preferences[0].toLowerCase();
    let categoriesStringUser = preferences[1].toLowerCase();
    let withoutUnder = preferences[2].replace("Under ", "");
    let timeStringUser = withoutUnder.replace(" Minutes", "");

    
    // console.log(tipArr[0].categories, tipArr[0].type, tipArr[0].time)

    tipArr.forEach((tip) => {
      let typeString = tip.type;
      let categoriesString = tip.categories;
      let timeString = tip.time;
      // console.log(typeStringUser, categoriesStringUser, withoutUnder, typeString, categoriesString);
      
      // either the types is set to anywhere(indooor or outdoor) or the categories is set to Both(physical or mental)
      // when only the categories can be ignored
      // console.log(preferences[0] === "Anywhere" || preferences[1] !== "Both");
      if (preferences[0] === "Anywhere" || preferences[1] !== "Both") {
        // console.log(timeString === timeStringUser && categoriesString === categoriesStringUser);
        // console.log(timeString, "  " ,timeStringUser,"  " , categoriesString,"  " , withoutUnder, "  " ,categoriesStringUser);
        if (timeString === timeStringUser && categoriesString === categoriesStringUser) {
          // console.log(sortedTipArr);
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
    // console.log(sortedTipArr);
    // when the tip array length is bigger than three
    if (sortedTipArr.length > 3) {
      getThreeRandomizedTips(sortedTipArr);
    }
  }
  // insertTips
  callback(sortedTipArr);
}