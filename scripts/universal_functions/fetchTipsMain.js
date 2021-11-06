const tipList = document.getElementById('dailyTips');

const tip1 = document.getElementById('tip1');
const tip2 = document.getElementById('tip2');
const tip3 = document.getElementById('tip3');

function fetchTips() {
  // for now just fetching the tip1, 2, 3 from the database
  let tipListArray = Array.from(tipList.children);
    tipListArray.forEach((child, index) => {
      let tipId = `tip${index + 1}`;

      db.collection('tips').doc(tipId).get().then(collection => {
      let tipData = collection.data();
      document.getElementById(tipId).innerHTML = tipData.name;
})
  })

}

document.addEventListener('DOMContentLoaded', fetchTips())