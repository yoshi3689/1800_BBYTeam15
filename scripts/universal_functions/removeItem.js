const dailyTips = document.getElementById('dailyTips');

//Removing things with the delete btn
dailyTips.addEventListener("click", deleteItem);
function deleteItem(event) {
    if (event.target.classList.contains("delete")) {
        if (window.confirm("Are you sure you wanna delete this?")) {//this 'confirm' means that, if you click 'yes' in the message popped up, this if statement is going to execute the stuf inside
            let li = event.target.parentNode;// in this case, 'event.target.parentNode' is referring to the parent node of the btn elment that is being clicked right now!!!
            dailyTips.removeChild(li);
        }
    }
}

//ticking off an item 12/14
// toDoList.addEventListener("click", tickOffItems);
// function tickOffItems(event) {
//     if (event.target.classList.contains("tickoff")) {
//         if (window.confirm("Oh you done with it??")) {
//             alert("Congratulations!! " + event.target.parentNode.firstChild.textContent //I thinnk I can make this shorter!
//             + " was sent to your completed list!! Keep going!!")
//             let li = event.target.parentNode;
//             compList.insertBefore(li, compList.firstChild);
//             //If the given child is a reference to an existing node in the document, appendChild()moves it from its current position to the new position!!!

//             //add the finished date 12/14
//             //the above is done on 12/15
//             //remove the redndant part of the time 1/8
//             let d = new Date().toString().slice(0, 28);
//             //slice(29, 55) is just gonna keep the redundant part lol
//             //console.log(d);

//             let finishedDate = document.createTextNode(d);
//             li.appendChild(finishedDate);
//             //then how do i parse date without timezone? 12/15

//             //hide the holder 12/14
//             //done in 12/15
//             let holder = document.getElementById("holder");holder.style.display = "none";

//             //remove all the child elements and add the date and the text content 12/14
            

//             //color columns
//             colorItems();
//         }
//     }
// }