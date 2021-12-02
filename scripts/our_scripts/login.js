var ui = new firebaseui.auth.AuthUI(firebase.auth());
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    var user = authResult.user;
                    // if a new user logins in, these preset values are set in firebase
                    if (authResult.additionalUserInfo.isNewUser) {
                        // Setting up a new user with the default preferences (Anywhere, Both, Any)
                        db.collection("users").doc(user.uid).set({
                                name: user.displayName,
                                email: user.email,
                                personalTips: [],
                                isPrefChanged: false,
                                //preset values for prefrences are set to anything.
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
                },
                uiShown: function () {
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: 'main.html',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
        };

        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);