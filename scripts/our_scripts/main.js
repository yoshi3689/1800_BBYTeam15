const dailyTips = document.getElementById('dailyTips');
const collection = 'tips';

let currentUser;
let currentUserInfo;

// a motherboard for all the tip fetching functions
function fetchTips() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.onSnapshot(userDoc => {
        currentUserInfo = userDoc.data();
        const personalPref = currentUserInfo.personalPref;
        const isPrefChanged = currentUserInfo.isPrefChanged;
        if (isPrefChanged) {
          // if the flag value is true, apply a new set of filters
          applyFilters(personalPref);

        } else {
          // if not, tips are fetched from the existing personalTIps
          fetchPersonalTips();
        }
      })
    }
  });
}

// invokes an appropriate filter & fetch function based on the value of the user preference 
function applyFilters(personalPref) {
  // 1.no preference
  if (personalPref[0] == "Anywhere" && personalPref[1] == "Both" && personalPref[2] == "Any") {
    getAnyTips();
  }
  // 2.filtering by categories
  else if (personalPref[0] == "Anywhere" && personalPref[1] != "Both" && personalPref[2] == "Any") {
    filterTips1(personalPref);
  }
  // 3.filtering by time
  else if (personalPref[0] == "Anywhere" && personalPref[1] == "Both" && personalPref[2] != "Any") {
    filterTips2(personalPref);
  }
  // 4. filtering by type
  else if (personalPref[0] != "Anywhere" && personalPref[1] == "Both" && personalPref[2] == "Any") {
    filterTips3(personalPref);
  }
  // 5.filtering categories and type
  else if (personalPref[0] != "Anywhere" && personalPref[1] != "Both" && personalPref[2] == "Any") {
    filterTips4(personalPref);
  }
  // 6. filtering by categories and time
  else if (personalPref[0] == "Anywhere" && personalPref[1] != "Both" && personalPref[2] != "Any") {
    filterTips5(personalPref);
  }
  // 7. both filtering by type and time
  else if (personalPref[0] != "Anywhere" && personalPref[1] == "Both" && personalPref[2] != "Any") {
    filterTips6(personalPref);
  }
  // 8. filtering by all three
  else {
    filterTips7(personalPref);
  }
}

// fetches tips based on the user's current personalTip array
function fetchPersonalTips() {
  let tipArrToDisplay = [];
  db.collection("tips").get().then(allTips => {
    allTips.forEach(doc => {
      const tip = doc.data();
      const id = tip.id;
      if (currentUserInfo.personalTips.find(personalTipNum => personalTipNum === id)) {
        tipArrToDisplay.push(tip);
      }
    })
    insertTips(tipArrToDisplay);
  })
}

// create a list item based on the array of tip information and insert them into
// the tip list.
function insertTips(arrToDisplay) {
  // clears out the old tips before displaying a new set of tips
  dailyTips.innerHTML = "";
  arrToDisplay.forEach((tip, index) => {
    const newTip = makeTip(tip, index);

    // add a class to a hashtag to highlight them with orange
    currentUserInfo.personalPref.forEach(preference => {
      if (preference == tip.categories) {
        newTip.getElementsByClassName("categories")[0].classList.add("matched")
      }
      if (preference == tip.type) {
        newTip.getElementsByClassName("type")[0].classList.add("matched")
      }
      if (preference == tip.time) {
        newTip.getElementsByClassName("time")[0].classList.add("matched")
      }
    });
    dailyTips.appendChild(newTip);
  })
  savePersonalTips(arrToDisplay);
}

// send a new set of tips fetched to Firebase
function savePersonalTips(tipArrDisplaying) {
  if (currentUserInfo.personalTips.length == 0 && tipArrDisplaying.length == 0) {
    currentUser.update({
      isPrefChanged: false
    });
    createMoreTipButton();
  } else {
    const tipIds = tipArrDisplaying.map(tip => {
      return tip.id;
    });;
    currentUser.update({
      personalTips: tipIds,
      isPrefChanged: false
    });
  }
}

// creates a HTML element with the information of each tip
function makeTip(tip, index) {
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
                <div class="tag-container" >
                  <small class="text-secondary d-block type">#${tip.type} </small> <small class="text-secondary d-block categories">#${tip.categories} </small><small class="text-secondary d-block time">#${tip.time} Mins</small>
                </div>
                <div class="d-flex align-items-center">
                    <div class="btn-space">
                        <button type="button" class="btn btn-info btn-sm complete">
                            <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20"
                                fill="currentColor" class="bi bi-check-lg" viewbox="0 0 16 16">
                                <path
                                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                        </button>
                    </div>
                    <button type="button" class="btn btn-danger delete btn-sm btn-size">𝗫</button>
                </div>`;
  return newTip;
}

// create a button for getting more tips
function createMoreTipButton() {
  const buttonWrapper = document.createElement("li");
  buttonWrapper.setAttribute("class", "button-wrapper");
  buttonWrapper.innerHTML = `No Tip To Show <br /> <br /> <button type="button" class="btn w-25 m-auto btn-important" onclick="removeSelf(this)" id="moreTips">More Tips?</button>`;
  dailyTips.appendChild(buttonWrapper);
}

// add the button a function that removes itself and restarts the tip fetching process
function removeSelf(el) {
  currentUser.update({
    isPrefChanged: true
  });
  el.remove();
}

// inserts the user's name 
function insertName() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get()
        .then(userDoc => {
          var userName = userDoc.data().name;
          console.log(userName);
          document.getElementById("user-name_avatar").innerText =
            userName;
        })
    } else {
      console.log("you did not sign in");
    }
  });
}

document.addEventListener('DOMContentLoaded', fetchTips);
insertName();