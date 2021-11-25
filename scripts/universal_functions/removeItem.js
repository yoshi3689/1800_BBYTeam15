// remove the tipId from he personalized tip list
const removeFromPersonalTips = (tipId) => {
    console.log('tip ' + tipId + " is deleted!"); 
        console.log("you already have  so we'");
        currentUser.update({
          personalTips: currentUserInfo.personalTips.filter(num => {
            return num != tipId;
          }),
        });
  }

//Removing a tip with the delete btn
const deleteTip = (event) => {
    console.log(event.target);
    if (event.target.classList.contains("delete")) {
        if (window.confirm("Are you sure you wanna delete this?")) {//this 'confirm' means that, if you click 'yes' in the message popped up, this if statement is going to execute the stuf inside
            let li = event.target.parentNode.parentNode.parentNode.classList.contains("list-group-item") 
                ? event.target.parentNode
                : event.target.parentNode.parentNode;
                console.log(li, 
                    li.getElementsByClassName(`label`)[0].classList[1], 
                    event.target.parentNode, 
                    event.target.parentNode.parentNode);
                dailyTips.removeChild(li);
               
                // here, checks if the user is logged in
                // if so, invokes a function that gets rid of the id of the tip the usr completed
            if (currentUserInfo) {
                removeFromPersonalTips(li.getElementsByClassName(`label`)[0].classList[1]);
            }
                
        }
    }
}




  dailyTips.addEventListener("click", deleteTip);