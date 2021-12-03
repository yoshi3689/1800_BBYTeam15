// removes the tipId from he personalized tip list
const removeFromPersonalTips = (tipId) => {
    console.log('tip ' + tipId + " is deleted!"); 
        console.log("you already have  so we'");
        currentUser.update({
          personalTips: currentUserInfo.personalTips.filter(num => {
            return num != tipId;
          }),
        });
  }

// removes a tip with the delete btn
const deleteTip = (event) => {
    console.log(event.target);
    if (event.target.classList.contains("delete")) {
        if (window.confirm("Are you sure you want to delete this tip?")) {
            let li = event.target.parentNode.parentNode.parentNode.classList.contains("list-group-item") 
                ? event.target.parentNode
                : event.target.parentNode.parentNode;
                console.log(li, 
                    li.getElementsByClassName(`label`)[0].classList[1], 
                    event.target.parentNode, 
                    event.target.parentNode.parentNode);
                dailyTips.removeChild(li);
               
            if (currentUserInfo) {
                removeFromPersonalTips(li.getElementsByClassName(`label`)[0].classList[1]);
            }
                
        }
    }
}




  dailyTips.addEventListener("click", deleteTip);