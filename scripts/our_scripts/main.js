const storage = window.localStorage;
const dailyTips = document.getElementById('dailyTips');
const collection = 'tips';


let currentUser;
let currentUserInfo;


// generate three random numbers

// a motherboard for all the tipFetching functions
function fetchTips() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.onSnapshot(userDoc => {
        currentUserInfo = userDoc.data();
        console.log(currentUserInfo)
        const personalPref = currentUserInfo.personalPref;
        const isPrefChanged = currentUserInfo.isPrefChanged;

        // what if personalTips.length === 0?
        //   else {
        //     console.log("no tip to show now");
        //   if (window.confirm("Do you want more tips??")) {
        //       userPref = userDoc.data().personalPref;
        //       fetchAllTips((arr) => {
        //       getFromGeneral(arr, userPref, insertTips);
        //     });
        //   }
        // }


        // when the value of the flag is true, tips are newly fetched
        // based on the filter values
        if (isPrefChanged) {
          console.log("is the user's pref changed? " + isPrefChanged)

          // 1.no preference
          // check if you are getting all sorts of tips
          if (personalPref[0] == "Anywhere" && personalPref[1] == "Both" && personalPref[2] == "Any") {
            console.log("check if you are getting all sorts of tips");
            getAnyTips();
          }
          // 2.anywhere && any
          // check if you are getting tips filtered by categories
          else if (personalPref[0] == "Anywhere" && personalPref[1] != "Both" && personalPref[2] == "Any") {
            console.log("heck if you are getting tips filtered by categories");
            filterTips1(personalPref);
          }

          // 3.both && anywhere
          // check if you are getting tips filtered by time
          else if (personalPref[0] == "Anywhere" && personalPref[1] == "Both" && personalPref[2] != "Any") {
            console.log("check if you are getting tips filtered by time");
            filterTips2(personalPref);
          }

          // 4. both and any
          // check if you are getting tips filtered by type
          else if (personalPref[0] != "Anywhere" && personalPref[1] == "Both" && personalPref[2] == "Any") {
            console.log("check if you are getting tips filtered by type");
            filterTips3(personalPref);
          }

          // 5.
          // filtering categories and type
          else if (personalPref[0] != "Anywhere" && personalPref[1] != "Both" && personalPref[2] == "Any") {
            console.log("filtering categories and type");
            filterTips4(personalPref);
          }
          // 6. anywhere
          // check if you are getting tips filtered by categories and time
          else if (personalPref[0] == "Anywhere" && personalPref[1] != "Both" && personalPref[2] != "Any") {
            console.log("check if you are getting tips filtered by categories and time");
            filterTips5(personalPref);
          }
          // 7. both 
          // check if you are getting tips filtered by type and time
          else if (personalPref[0] != "Anywhere" && personalPref[1] == "Both" && personalPref[2] != "Any") {
            console.log("check if you are getting tips filtered by type and time");
            filterTips6(personalPref);
          }

          // 8. all filters are set
          else {
            console.log("all filters are set");
            filterTips7(personalPref);
          }
          // should this happen here?
          
        } else {
          // if not, tips are fetched from the existing personalTIps
          console.log("the preferences have not changed, so just display what the user already has");
          let tipArrToDisplay = [];
          db.collection("tips").get().then(allTips => {
            // console.log(allTips)
            allTips.forEach(doc => {
              const tip = doc.data();
              const id = tip.id;
              if (currentUserInfo.personalTips.find(personalTipNum => personalTipNum === id)) {
                tipArrToDisplay.push(tip);
              }
              // console.log(tipArrToDisplay);
            })

            insertTips(tipArrToDisplay);
          })
        }


      })
    }
  });
}

// send a new set of tips fetched to Firebase
function savePersonalTips(tipArrDisplaying) {
  console.log(currentUserInfo);
  if (!currentUserInfo.personalTips || currentUserInfo.personalTips.length == 0) {
    const tipIds = tipArrDisplaying.map(tip => {
      return tip.id;
    });;
    currentUser.update({
      personalTips: tipIds,
      isPrefChanged: false
    });
  } else {
    console.log("you already have personal tips");
  }
}

// create each tip item the array into each corresponding label element
function insertTips(arrToDisplay) {
  console.log(arrToDisplay)
  dailyTips.innerHTML = "";
  arrToDisplay.forEach((tip, index) => {
    const newTip = document.createElement("li");
    newTip.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
    newTip.setAttribute("id", `tip${index + 1}`)

    let hrefToSet = "details.html?collection=tips&id=tip" + tip.id;
    let srcToSet = "/" + tip.image;
    newTip.innerHTML = `
                <a href="${hrefToSet}" class="d-block wrapper link">
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

document.addEventListener('DOMContentLoaded', fetchTips);