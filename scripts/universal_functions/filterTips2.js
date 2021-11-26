// Ashkan
// change the preference settings on the profile page 



function filterTips2() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.onSnapshot(userDoc => {
        currentUserInfo = userDoc.data();
        console.log(currentUserInfo)
        const personalPref = currentUserInfo.personalPref;
        console.log(personalPref)
        //anywhere and both
        // filtering categories and type
        if (personalPref[0] != "Anywhere" && personalPref[1] != "Both" && personalPref[2] == "Any") {
          db.collection("tips").where("categories", "==", personalPref[0])
          .where("categories", "==", personalPref[1])
            .get().then(allTips => {
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
          // both 
          // check if you are getting tips filtered by categories and time
          else if (personalPref[0] != "Anywhere" && personalPref[1] == "Both" && personalPref[2] != "Any") {
          db.collection("tips").where("categories", "==", personalPref[0])
          .where("categories", "==", personalPref[2])
            .get().then(allTips => {
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
          // anywhere
          // check if you are getting tips filtered by type and time
          if (personalPref[0] == "Anywhere" && personalPref[1] != "Both" && personalPref[2] != "Any") {
          db.collection("tips").where("categories", "==", personalPref[1])
          .where("categories", "==", personalPref[2])
            .get().then(allTips => {
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
        
// filterTips2();