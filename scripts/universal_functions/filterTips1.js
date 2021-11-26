// sarah
// change the preference settings on the profile page 

let tipArrToDisplay = [];
function filterTips1() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.onSnapshot(userDoc => {
        currentUserInfo = userDoc.data();
        console.log(currentUserInfo)
        const personalPref = currentUserInfo.personalPref;
        console.log(personalPref)
        // 1.no preference
        // check if you are getting all sorts of tips
        if (personalPref[0] == "Anywhere" && personalPref[1] == "Both" && personalPref[2] == "Any") {
          db.collection("tips").limit(3).get().then(allTips => {
              console.log(allTips)
              allTips.forEach(doc => {
                console.log(doc.data());
                const tip = doc.data();
                const id = tip.id;
                if (currentUserInfo.personalTips.find(personalTipNum => personalTipNum === id)) {
                  const name = tip.name;
                  const docId = doc.id;
                  const categories = tip.categories;
                  const type = tip.type;
                  const time = tip.time;
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

            })
        }

        // 2.anywhere && any
        // check if you are getting tips filtered by categories
        if (personalPref[0] == "Anywhere" && personalPref[1] != "Both" && personalPref[2] == "Any") {
          db.collection("tips").where("categories", "==", "indoor")
            .limit(3).get().then(allTips => {
              console.log(allTips)
              allTips.forEach(doc => {
                console.log(doc.data());
                const tip = doc.data();
                const id = tip.id;
                if (currentUserInfo.personalTips.find(personalTipNum => personalTipNum === id)) {
                  const name = tip.name;
                  const docId = doc.id;
                  const categories = tip.categories;
                  const type = tip.type;
                  const time = tip.time;
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

            })
        }

        // both && anywhere
        // check if you are getting tips filtered by time
        if (personalPref[0] == "Anywhere" && personalPref[1] == "Both" && personalPref[2] != "Any") {
          db.collection("tips").where("categories", "==", "indoor")
            .limit(3).get().then(allTips => {
              console.log(allTips)
              allTips.forEach(doc => {
                console.log(doc.data());
                const tip = doc.data();
                const id = tip.id;
                if (currentUserInfo.personalTips.find(personalTipNum => personalTipNum === id)) {
                  const name = tip.name;
                  const docId = doc.id;
                  const categories = tip.categories;
                  const type = tip.type;
                  const time = tip.time;
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
            })
        }


      })
    }
  });
}

filterTips1();