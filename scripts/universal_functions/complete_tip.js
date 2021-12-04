// updates the user's progress list with a new completed tip.
const addToProgressList = (tipId) => {
    if (!currentUserInfo.progressList) {
      currentUser.update({
        personalTips: currentUserInfo.personalTips.filter(num => 
          {
            return num != parseInt(tipId);
          }),
        progressList: Array.from(parseInt(tipId)),
      });
    } else {
      currentUser.update({
        personalTips: currentUserInfo.personalTips.filter(num => {
          return num != tipId;
        }),
        progressList: new Array(...currentUserInfo.progressList, tipId)
      });
    } 
}

// completes a tips on the UI
const completeTip = (event) => {
  if (event.target.classList.contains("complete") || event.target.parentNode.classList.contains("complete")) {
    if (window.confirm("Are you sure you completed this tip?")) {
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