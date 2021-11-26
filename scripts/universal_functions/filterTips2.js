<<<<<<< HEAD
// Ashkan
// change the preference settings on the profile page 

let tipArrToDisplay = [];

function filterTips2() {
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
        if (personalPref[0] != "Anywhere" && personalPref[1] != "Both" && personalPref[2] == "Any") {
          db.collection("tips").where("categories", "==", personalPref[0])
          .where("categories", "==", personalPref[1]).limit(3)
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
          .where("categories", "==", personalPref[2]).limit(3)
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
          .where("categories", "==", personalPref[2]).limit(3)
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
=======
//Ashkan

         //any
        if (preferences[0] != "Anywhere" && preferences[1] != "Both" && preferences[2] == "Any") {
        db.collection("tips")
          .where("categories", "==", "indoor")
        .orderBy("type").limit(3)
          .get().then(allTips => {
          console.log(allTips)
          allTips.forEach(doc => {
            console.log(doc.data());
        where("type", "==", "indoor")
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

        //both
        if (preferences[0] != "Anywhere" && preferences[1] == "Both" && preferences[2] != "Any") {
        db.collection("tips")
          .where("categories", "==", "indoor")
        .orderBy("type").limit(3)
          .get().then(allTips => {
          console.log(allTips)
          allTips.forEach(doc => {
            console.log(doc.data());
        where("type", "==", "indoor")
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


        //anywhere
        if (preferences[0] == "Anywhere" && preferences[1] != "Both" && preferences[2] != "Any") {
        db.collection("tips").where("categories", "==", "indoor").where("time", "==", 5).limit(3).get().then(allTips => {
          
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
>>>>>>> a7a2376 (JS filter testing.)
