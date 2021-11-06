const tipList = document.getElementById('dailyTips');

function fetchTips() {
  // for now just fetching the tip1, 2, 3 from the database
  let tipListArray = Array.from(tipList.children);
    tipListArray.forEach((child, index) => {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      db.collection('tips').doc(`tip${randomNum}`).get().then(collection => {
      let tipData = collection.data();
      // check if the number or the name is already chosen
      console.log(tipData)
      document.getElementById(`tip${index + 1}`).innerHTML = tipData.name;
});
  });

}

document.addEventListener('DOMContentLoaded', fetchTips())