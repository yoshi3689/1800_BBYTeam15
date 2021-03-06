var currentUser;
const progressList = document.getElementById('insert-progress-here');
let userData;

const insertUserInfo = () => {
  document.getElementById("user-name_avatar").innerText = userData.name;
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

// makes sure someone is logged in, then does the stuff in it 
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid);
    // retrieve user's information
    currentUser.get()
      .then(userDoc => {
        // Get progressList from firestore
        var userProgressList = userDoc.data().progressList;
        if (userProgressList == undefined) {
          const noTips = document.createElement("p");
          noTips.innerHTML = `No tips completed yet..!`;
          noTips.setAttribute("class", "d-block w-50 text-center m-auto mt-5");
          progressList.appendChild(noTips);
        } else {
          displayProgress(userProgressList);
        }
      })
  }
});

function displayProgress(userProgressList) {
  // going through each tip in it
  db.collection("tips").get().then(allTips => {
    // if there's any tip to display, run the forEach
    allTips.forEach(doc => {
      const tip = doc.data();
      const id = tip.id;

      for (let i = userProgressList.length - 1; i >= 0; i--) {

        if (userProgressList[i] == id) {
          const name = tip.name;
          const progressTip = document.createElement("a");
          let hrefToSet = "details.html?collection=tips&id=tip" + id;
          progressTip.innerHTML = `${name}`;
          progressTip.setAttribute("href", hrefToSet);
          progressTip.setAttribute("class", "btn btn-info d-block w-auto text-center m-auto mt-3");
          progressList.appendChild(progressTip);
        }
      }
    })
  })
}