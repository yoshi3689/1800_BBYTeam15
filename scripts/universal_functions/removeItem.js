//Removing things with the delete btn
dailyTips.addEventListener("click", deleteItem);
function deleteItem(event) {
    if (event.target.classList.contains("delete")) {
        if (window.confirm("Are you sure you wanna delete this?")) {//this 'confirm' means that, if you click 'yes' in the message popped up, this if statement is going to execute the stuf inside
            let li = event.target.parentNode.parentNode.parentNode.classList.contains("list-group-item") 
              ? event.target.parentNode.parentNode.parentNode
              : event.target.parentNode.parentNode.parentNode.parentNode;
                dailyTips.removeChild(li);
        }
    }
}
