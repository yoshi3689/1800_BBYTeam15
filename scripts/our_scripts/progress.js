
var currentUser;
const progressList = document.getElementById('insert-progress-here');

// makes sure someone is logged in, then does the stuff in it 
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid);
    var userID = user.uid;

    // retrieve user's information
    currentUser.get()
      .then(userDoc => {

        // Get progressList from firestore
        var userProgressList = userDoc.data().progressList;


    if (userProgressList == undefined) {

      const noTips = document.createElement("p");
      
      noTips.innerHTML = `No tips completed yet..!`;
      noTips.setAttribute("class", "d-block w-50 text-center m-auto mt-5");

      progressList.appendChild(noTips);


    } else {
        
        // going through each tip in it
        db.collection("tips").get().then(allTips => {
          console.log(allTips);
          // if there's any tip to display, run the forEach
          allTips.forEach(doc => {
            const tip = doc.data();
            const id = tip.id;
  
              for (let i = userProgressList.length - 1; i > -1; i--) {

                if (userProgressList[i] == id) {
                  const name = tip.name;

                  console.log(userProgressList);
  
                // let completedTip = userProgressList[i];
                
                const progressTip = document.createElement("a");

                let hrefToSet = "details.html?collection=tips&id=tip" + id;


                progressTip.innerHTML = `${name}`;

                  progressTip.setAttribute("href", hrefToSet);
                  progressTip.setAttribute("class", "btn btn-info d-block w-50 text-center m-auto mt-3");

                  console.log(id)
                progressList.appendChild(progressTip);
  
                console.log(userProgressList[i]);
                }

            }

        })
        

        })

        }
      })
    }
    });



  // function setTipData(id) {
  //   localStorage.setItem("tipID", id);
  // }
