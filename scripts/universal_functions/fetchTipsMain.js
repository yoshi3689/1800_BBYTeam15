// const tipList = document.getElementById('dailyTips');

// function fetchTips() {
//   // for now just fetching the tip1, 2, 3 from the database
//   let tipListArray = Array.from(tipList.children);
//   let numbersFetched = [];
//     tipListArray.forEach((child, index) => {
//       const randomNum = Math.floor(Math.random() * 6) + 1;
//       if (!numbersFetched.find(num => num === randomNum)) {
//         numbersFetched.push(randomNum);
//         const tipFetched = db.collection('tips').doc(`tip${randomNum}`);
//         tipFetched.get().then(collection => {
//         let tipData = collection.data();
//         document.getElementById(`tip${index + 1}`).innerHTML = tipData.name;
//         console.log(randomNum)
//         });
//       }
//   });
// }

// document.addEventListener('DOMContentLoaded', fetchTips)