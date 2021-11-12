// const dailyTips = document.getElementById('dailyTips');

dailyTips.addEventListener("click", completeTip);


function completeTip(event) {
  // if (document.getElementById("flexCheckIndeterminate1").checked = true) {
  if (event.target.classList.contains("check")) {
    if (window.confirm("Did you complete this tip?")) {
      let li = event.target.parentNode;
      addToProgress();
      dailyTips.removeChild(li);

    }
  };
}

function addToProgress() {

  console.log(dailyTips);
  let currentTip = document.getElementById('tip1').innerText;

  // let currentTip = document.getElementById('tip1').innerText;
  console.log(currentTip); 

  searchForTip();

  let progressList = db.collection("progress");

  // let tip1 = db.collection('tips').doc('tip1').data().name;

  // progressList.add(document.getElementById(tip1));
}


function searchForTip() {
  let currentTip = document.getElementById('tip1').innerText;
  db.collection("tips").where("name", "==", currentTip)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
      });
    })
}

//  // Create a reference to the tips collection
// import { collection, query, where, getDocs } from "firebase/firestore";

//  const tipsRef = collection(db, "tips");

//  // Create a query against the collection.
//  const q = query(tipsRef, where("name", "==", currentTip));
 
//  const querySnapshot = await getDocs(q);
//  querySnapshot.forEach((doc) => {
//    // doc.data() is never undefined for query doc snapshots
   
//    console.log(doc.id, " => ", doc.data());
//  });

// function searchForTip() {
//   db.collection('tips').get().then(function (querySnapshot) {
//     console.log(querySnapshot);
//     querySnapshot.foreach(function (doc) {
//       let tipData = doc.data();
//       if (currentTip == tipData.name) {
//         return tipData;
//       }
//     })
//   }
//   )
// }


// var ref = firebase.database().ref("users/ada");
// ref.once("value")
//   .then(function(snapshot) {
//     var name = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}
//     var firstName = snapshot.child("name/first").val(); // "Ada"
//     var lastName = snapshot.child("name").child("last").val(); // "Lovelace"
//     var age = snapshot.child("age").val(); // null
//   });

  
  // Loop through users in order with the forEach() method. The callback
  // provided to forEach() will be called synchronously with a DataSnapshot
  // for each child:
  // var query = firebase.database().ref("tips").orderByKey();
  // query.once("value")
  //   .then(function(snapshot) {
  //     snapshot.forEach(function(childSnapshot) {
  //       // key will be "ada" the first time and "alan" the second time
  //       var key = childSnapshot.key;
  //       // childData will be the actual contents of the child
  //       var childData = childSnapshot.val();
  //   });
  // });
