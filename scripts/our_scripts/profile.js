const prefList = document.getElementById('pref');
let userData;
let user_ID;
let currentUser;

const insertUserInfo = () => {
  document.getElementById("user-name_avatar").innerText = userData.name;
  for (let i = 1; i <= 9; i++) {
    userData.personalPref.forEach(preference => {
      let prefToCheck = document.getElementById(`pref_label${i}`);
      if (prefToCheck.innerText.indexOf(preference) != -1) {
        document.getElementById(`btnradio${i}`).checked = true;
        console.log(prefToCheck.previousElementSibling, prefToCheck.innerHTML)
      }
    })
  }
}

const fetchUser = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user_ID = user.uid;

      currentUser = db.collection("users").doc(user.uid);
      currentUser.onSnapshot(userDoc => {
        userData = userDoc.data();
        insertUserInfo();
        console.log(userData);
      });
    } else {
      console.log("you did not sign in");
    }
  });
}
fetchUser();

const savePreference = (pref) => {
  if (userData) {
    currentUser.update({
        personalPref: pref,
        isPrefChanged: true
      })
      .then((a) => {
        console.log("Document successfully updated! " + pref);
      })
  }
}

const fetchPrefText = (e) => {
  let preferencesToUpdate = [userData.personalPref[0], userData.personalPref[1], userData.personalPref[2]];
  if (e.target.tagName == "LABEL") {
    const parent = e.target.parentNode;
    const preferenceToAdd = e.target.innerText;
    if (parent.classList.contains('pref_set1')) {
      preferencesToUpdate[0] = preferenceToAdd;
    }
    if (parent.classList.contains('pref_set2')) {
      preferencesToUpdate[1] = preferenceToAdd;
    }
    if (parent.classList.contains('pref_set3')) {
      preferencesToUpdate[2] = parseInt(preferenceToAdd.replace("Under ", "").replace(" Minutes", ""))
        ? parseInt(preferenceToAdd.replace("Under ", "").replace(" Minutes", ""))
        : preferenceToAdd;
    }
    if (currentUser) {
      savePreference(preferencesToUpdate);
    }
  }
}

prefList.addEventListener('click', fetchPrefText);

// var currentUser;
const progressList = document.getElementById("insert-top-3-here");

// makes sure someone is logged in, then does the stuff in it 
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid);
    var userID = user.uid;
    
    // retrieve user's information
    currentUser.get()
      .then(userDoc => {

        // Get progressList from firestore
        var userProgressList = userDoc.data().progressList;
        
        // going through each tip in it
        db.collection("tips").get().then(allTips => {
          console.log(allTips);
          // if there's any tip to display, run the forEach
          allTips.forEach(doc => {
            const tip = doc.data();
            const id = tip.id;
  
              for (let i = userProgressList.length - 1; i > userProgressList.length - 4; i--) {

                if (userProgressList[i] == id) {
                  const name = tip.name;

                  console.log(userProgressList);
  
                // let completedTip = userProgressList[i];
                
                const progressTip = document.createElement("p");

                progressTip.innerHTML = `<p>${name}</p>`;

                progressList.appendChild(progressTip);
  
                console.log(userProgressList[i]);

            }


            }


        });

        })

        }

      )
    }
  });
