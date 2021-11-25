db.collection("tips")
  .where("type", "==", "indoor")
  // .where("time", "==", 5)
// .orderBy("type").limit(3)
  .get().then(allTips => {
  console.log(allTips)
  allTips.forEach(doc => {
    console.log(doc.data());
// where("type", "==", "indoor"
    // const tip = doc.data();
    // const id = tip.id;
    // if (currentUserInfo.personalTips.find(personalTipNum => personalTipNum === id)) {
    //   const name = tip.name;
    //   const docId = doc.id;
    //   const categories = tip.categories.id;
    //   const type = tip.type.id;
    //   const time = tip.time.id;
    //   const image = tip.image;

    //   tipArrToDisplay.push({
    //     name,
    //     id,
    //     categories,
    //     type,
    //     time,
    //     image,
    //     docId
    //   });
    // }
  })

})

// add this function to the user's list of progress
const addToProgressList = (tipId) => {
  // if so, invokes a function that gets rid of the id of the tip the usr completed from personalTips
    if (!currentUserInfo.progressList) {
      currentUser.update({
        personalTips: currentUserInfo.personalTips.filter(num => 
          {
            return num != parseInt(tipId);
          }),
        progressList: Array.from(parseInt(tipId)),
      });
    } else {
      // had to create a new array
      console.log("you already have progressList list so we'll add the one you finished to it");
      currentUser.update({
        personalTips: currentUserInfo.personalTips.filter(num => {
          return num != tipId;
        }),
        progressList: new Array(...currentUserInfo.progressList, tipId)
        
      });
    } 
  // let currentTip = document.getElementById('tip1').innerText;

  // let currentTip = document.getElementById('tip1').innerText;
  // console.log(currentTip); 

  // searchForTip();

  // let progressList = db.collection("progress");

  // let tip1 = db.collection('tips').doc('tip1').data().name;

  // progressList.add(document.getElementById(tip1));
}

const completeTip = (event) => {
  if (event.target.classList.contains("complete") || event.target.parentNode.classList.contains("complete")) {
    // working
    if (window.confirm("Did you complete this tip?")) {
      let li = event.target.parentNode.parentNode.parentNode.classList.contains("list-group-item") 
      ? event.target.parentNode.parentNode.parentNode
      : event.target.parentNode.parentNode.parentNode.parentNode;
      dailyTips.removeChild(li);
      console.log(li, li.getElementsByClassName(`label`)[0].classList[1]);
      
      if (currentUserInfo) {
        addToProgressList(li.getElementsByClassName(`label`)[0].classList[1]);
      }
    }
    
  };
}

dailyTips.addEventListener("click", completeTip);

// and i wanna add another tip if one tip is completed
// excluding the tip that has the tipId of the just completed

// function searchForTip() {
//   let currentTip = document.getElementById('tip1').innerText;
//   db.collection("tips").where("name", "==", currentTip)
//     .get()
//     .then(function(querySnapshot) {
//       querySnapshot.forEach(function(doc) {
//         console.log(doc.id, " => ", doc.data());
//       });
//     })
// }

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
