var currentUser;

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {
                    var userPhone = userDoc.data().phone;
                    var userEmail = userDoc.data().email;

                    if (userPhone != null) {
                        document.getElementById("phoneInput").value = userPhone;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                })
        } else {
            console.log("No user is signed in");
        }
    })
}
populateInfo();

function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    userPhone = document.getElementById('phoneInput').value;
    userEmail = document.getElementById('emailInput').value;

    currentUser.update({
        email: userEmail,
        phone: userPhone,
    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    document.getElementById('personalInfoFields').disabled = true;
}
