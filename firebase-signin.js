var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();
provider.setCustomParameters({
    'login_hint': 'user@example.com'
});

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        //user is Signed in
        console.log("[f]onAuthStateChanged - signed in");
        document.getElementById('id-section').classList.add('hide');
        document.getElementById('password-section').classList.add('hide');
    }else{
        //user is not signed in
        console.log("[f]onAuthStateChanged - signed out");
        document.getElementById('id-section').classList.remove('hide');
        document.getElementById('password-section').classList.remove('hide');
    }
    
})

function signIn(){
    var email = document.getElementById('id-field').value;
    var password = document.getElementById('password-field').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result){
        document.getElementById("user-info").innerHTML = "Hello " + email;
        document.getElementById("user-info").classList.remove('hide');
    }).catch(function(error){
        console.log(error.message);
    });
}

function googleSignIn(){
    var accountName = document.getElementById('id-field');
    var password = document.getElementById('password-field');
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(result);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(error);
    });
}

function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        alert("Signed out")
        signInPopup.classList.add("hide");
      }).catch(function(error) {
        // An error happened.
      });
}