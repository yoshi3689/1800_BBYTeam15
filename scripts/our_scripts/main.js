console.log('connected')
const tipList = document.getElementById('dailyTips');
const storage = window.localStorage;

console.log(document.referrer)

const transferTip = e => {
  if (e.target.innerHTML.includes('<')) {
    const tipId = e.target.children.item(1).id;
    console.log(tipId);
    // if the tip is not stored in the local storage, it creates a new tip key in there
    if (storage.getItem(tipId) == null) {
      storage.setItem(tipId, tipId);
      console.log(tipId + " stored successfully");
    }
  }
  
}

tipList.addEventListener('click', transferTip);
// const userName_ava = document.getElementById('user-name_avatar');