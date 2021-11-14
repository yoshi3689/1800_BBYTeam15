const prefList = document.getElementById('pref');
let userData;
let user_ID;
let currentUser;

const insertUserInfo = () => {
  document.getElementById("user-name_avatar").innerText = userData.name;
  for (let i = 1; i <= 9; i++) {
    userData.personalPref.forEach(preference => {
      let prefToCheck = document.getElementById(`pref_label${i}`);
      if (prefToCheck.innerText === preference) {
        document.getElementById(`btnradio${i}`).checked = true;
        // console.log(prefToCheck.previousElementSibling, prefToCheck.innerHTML)
      }
    })
  }
}

const fetchUser = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // console.log(user.uid);
      user_ID = user.uid;
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get()
        .then(userDoc => {
          userData = userDoc.data();
          insertUserInfo()
        })
    } else {
      console.log("you did not sign in");
    }
  });
}
fetchUser()

const savePreference = (pref) => {
  if (userData) {
    currentUser.update({
        name: userData.name,
        email: userData.email,
        personalPref: pref
      })
      .then((a) => {
        console.log("Document successfully updated! " + a);
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
      preferencesToUpdate[2] = preferenceToAdd;
    }
    if (currentUser) {
      savePreference(preferencesToUpdate);
    }
  }
}

prefList.addEventListener('click', fetchPrefText);