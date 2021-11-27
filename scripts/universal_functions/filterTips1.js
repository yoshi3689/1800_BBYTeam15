// maybe i should make these functions below asynchronous?

// in each of these functions
// I have to add a logic that fetches a new set of tips

const getThreeRandomNums = (arr) => {
  let newTipIds = [];
  let randomNumRecords = [];
  let i = 0;
  while (i !== 3) {
    const randomNum = Math.floor(Math.random() * (arr.length));
    if (!randomNumRecords.find(num => num == randomNum)) {
      randomNumRecords.push(randomNum);
      newTipIds.push(arr[randomNum]);
      i++;
    }
  }
  // console.log(arr)
  return newTipIds;
}

// getting tips with no filter applied
function getAnyTips() {
  let tipArrToDisplay = [];
  db.collection("tips").get().then(allTips => {
    const tipIds = allTips.docs.map(doc => parseInt(doc.id.replace("tip", "")));
    const randomNumsArr = getThreeRandomNums(tipIds);
    console.log(randomNumsArr)
    allTips.forEach(doc => {
      console.log(doc.data());
      const tip = doc.data();
      const id = tip.id;

      if (randomNumsArr.find(num => num == id)) {
        tipArrToDisplay.push(tip);
      }
    })
    insertTips(tipArrToDisplay);
  })
}

// getting tips filtered by categories
function filterTips1(personalPref) {
  let tipArrToDisplay = [];
  db.collection("tips")
    .where("categories", "==", personalPref[1])
    .get().then(allTips => {
      const tipIds = allTips.docs.map(doc => parseInt(doc.id.replace("tip", "")));
      const randomNumsArr = getThreeRandomNums(tipIds);
      console.log(allTips)
      allTips.forEach(doc => {
        console.log(doc.data());
        const tip = doc.data();
        const id = tip.id;
        if (randomNumsArr.find(num => num == id)) {
          tipArrToDisplay.push(tip);
        }
      })
      insertTips(tipArrToDisplay);
    })
}

// not working
// getting tips filtered by time
function filterTips2(personalPref) {
  let tipArrToDisplay = [];
  db.collection("tips")
    .where("time", "==", personalPref[2])
    .get().then(allTips => {
      const tipIds = allTips.docs.map(doc => parseInt(doc.id.replace("tip", "")));
      const randomNumsArr = getThreeRandomNums(tipIds);
      console.log(allTips)
      allTips.forEach(doc => {
        console.log(doc.data());
        const tip = doc.data();
        const id = tip.id;
        if (randomNumsArr.find(num => num == id)) {
          tipArrToDisplay.push(tip);
        }
      })

      // passing the filtered tip array to the function
      insertTips(tipArrToDisplay);
    })
}

// getting tips filtered by type
function filterTips3(personalPref) {
  console.log(personalPref)
  let tipArrToDisplay = [];
  db.collection("tips")
    .where("type", "==", personalPref[0])
    .get().then(allTips => {
      console.log(allTips)
      const tipIds = allTips.docs.map(doc => parseInt(doc.id.replace("tip", "")));
      const randomNumsArr = getThreeRandomNums(tipIds);
      console.log(allTips)
      allTips.forEach(doc => {
        console.log(doc.data());
        const tip = doc.data();
        const id = tip.id;
        if (randomNumsArr.find(num => num == id)) {
          tipArrToDisplay.push(tip);
        }
      })
      insertTips(tipArrToDisplay);
    })
}

// filtering categories and type
function filterTips4(personalPref) {
  let tipArrToDisplay = [];
  db.collection("tips")
    .where("categories", "==", personalPref[1])
    .where("type", "==", personalPref[0])
    .get().then(allTips => {
      const tipIds = allTips.docs.map(doc => parseInt(doc.id.replace("tip", "")));
      const randomNumsArr = getThreeRandomNums(tipIds);
      console.log(allTips)
      allTips.forEach(doc => {
        console.log(doc.data());
        const tip = doc.data();
        const id = tip.id;
        if (randomNumsArr.find(num => num == id)) {
          tipArrToDisplay.push(tip);
        }
      })
      insertTips(tipArrToDisplay);
    })
}

// not working
// getting tips filtered by categories and time
function filterTips5(personalPref) {
  let tipArrToDisplay = [];
  db.collection("tips")
    .where("categories", "==", personalPref[1])
    .where("time", "==", personalPref[2])
    .get().then(allTips => {
      const tipIds = allTips.docs.map(doc => parseInt(doc.id.replace("tip", "")));
      const randomNumsArr = getThreeRandomNums(tipIds);
      console.log(allTips)
      allTips.forEach(doc => {
        console.log(doc.data());
        const tip = doc.data();
        const id = tip.id;
        if (randomNumsArr.find(num => num == id)) {
          tipArrToDisplay.push(tip);
        }
      })
      insertTips(tipArrToDisplay);
    })
}

// getting tips filtered by type and time
function filterTips6(personalPref) {
  console.log(personalPref)
  let tipArrToDisplay = [];
  db.collection("tips")
    .where("type", "==", personalPref[0])
    .where("time", "==", personalPref[2])
    .get().then(allTips => {
      const tipIds = allTips.docs.map(doc => parseInt(doc.id.replace("tip", "")));
      const randomNumsArr = getThreeRandomNums(tipIds);
      console.log(allTips)
      allTips.forEach(doc => {
        console.log(doc.data());
        const tip = doc.data();
        const id = tip.id;
        if (randomNumsArr.find(num => num == id)) {
          tipArrToDisplay.push(tip);
        }
      })
      insertTips(tipArrToDisplay);
    })
}

// filtering tips with all the fields
function filterTips7(personalPref) {
  console.log(personalPref);
  let tipArrToDisplay = [];
  db.collection("tips")
    // .where("type", "==", personalPref[0])
    // .where("categories", "==", personalPref[1])
    .where("time", "==", personalPref[2])
    .get().then(allTips => {
      const tipIds = allTips.docs.map(doc => parseInt(doc.id.replace("tip", "")));
      const randomNumsArr = getThreeRandomNums(tipIds);
      console.log(allTips)
      allTips.forEach(doc => {
        console.log(doc.data());
        const tip = doc.data();
        const id = tip.id;
        if (randomNumsArr.find(num => num == id)) {
          tipArrToDisplay.push(tip);
        }
      })
      insertTips(tipArrToDisplay);
    })
}