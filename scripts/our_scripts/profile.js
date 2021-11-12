const prefList = document.getElementById('pref');
let preferencesToUpdate = ['Anywhere', 'Both', 'Under 5 min'];
let currentUser = db.collection("users").doc(user.uid);
const fetchPrefText = (e) => {
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

      console.log(preferencesToUpdate);
    }
}

function savePreference() {
  currentUser.get()
    .then(userDoc => {
      console.log(userDoc.data());
    })
  // currentUser.update({
  //                 name: userName,
  //                 school: userSchool,
  //                 city: userCity
  //             })
  //             .then(() => {
  //                 console.log("Document successfully updated!");
  //             })

  document.getElementById('personalInfoFields').disabled = true;
}

prefList.addEventListener('click', () => {
  fetchPrefText();
  savePreference();
});

