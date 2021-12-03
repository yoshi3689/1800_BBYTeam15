var ui = new firebaseui.auth.AuthUI(firebase.auth());

function onLogin (authResult, redirectUrl) {
    var user = authResult.user;
    if (authResult.additionalUserInfo.isNewUser) {
        db.collection("users").doc(user.uid).set({
                name: user.displayName,
                email: user.email,
                personalTips: [],
                isPrefChanged: false,
                personalPref: ['Anywhere', 'Both', 'Any']
            }).then(function () {
                window.location.assign("main.html");
            })
            .catch(function (error) {
                console.log("Error adding new user: " + error);
            });
    } else {
        return true;
    }
    return false;
}

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: onLogin,
        uiShown: function () {
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);