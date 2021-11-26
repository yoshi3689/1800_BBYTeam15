// sarah
// change the preference settings on the profile page 

function getAnyTips() {
  let tipArrToDisplay = [];
  db.collection("tips").get().then(allTips => {
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

    insertTips(tipArrToDisplay)
  })
}

function filterTips1() {
  db.collection("tips").where("categories", "==", "indoor")
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

function filterTips2() {
  db.collection("tips").where("categories", "==", "indoor")
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