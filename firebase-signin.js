var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();
provider.setCustomParameters({
    'login_hint': 'user@example.com'
});
var currentUser;
window.onload = function(){
    if(user){
        console.log(user);
    }else{
        console.log('not logged in');
    }
    
}

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        currentUser = user;
        //user has Signed in
        console.log("[f]onAuthStateChanged - signed in");
        document.getElementById('id-section').classList.add('hide');
        document.getElementById('password-section').classList.add('hide');
        document.getElementById("user-info").innerHTML = "Hello " + user.email;
        document.getElementById("user-info").classList.remove('hide');
        document.getElementById("signin-button").classList.add('hide');
        document.getElementById("signout-button").classList.remove('hide');
        document.getElementById("google-signin-button").classList.add('hide');
        document.getElementById("google-signup-button").classList.add('hide');
    }else{
        //user has signed out
        currentUser = null;
        console.log("[f]onAuthStateChanged - signed out");
        document.getElementById('id-section').classList.remove('hide');
        document.getElementById('password-section').classList.remove('hide');
        document.getElementById("signin-button").classList.remove('hide');
        document.getElementById("signout-button").classList.add('hide');
        document.getElementById("google-signin-button").classList.remove('hide');
        document.getElementById("google-signup-button").classList.remove('hide');
        document.getElementById("user-info").innerHTML = "";
        document.getElementById("user-info").classList.add('hide');
    }
    
})


function signIn(){
    var email = document.getElementById('id-field').value;
    var password = document.getElementById('password-field').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result){
        console.log(result);
    }).catch(function(error){
        console.log(error.message);
    });

}

function googleSignIn(){

    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log(result);
      }).catch(function(error) {
        console.log(error.message);
    });
}

function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        
        signInPopup.classList.add("hide");
      }).catch(function(error) {
        // An error happened.
      });
}

function toggleSignUp(){
    document.getElementById('signin-popup').classList.add('hide');
    document.getElementById('signup-popup').classList.remove('hide');
}

function signUp(){
    var email = document.getElementById('new-id-field').value;
    var password = document.getElementById('new-password-field').value;
    var passwordCheck = document.getElementById('new-password-check-field').value;

    var errorLog = document.getElementById('error-message');
    
    if(password === passwordCheck){
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
            errorLog.innerHTML = "";
        }).catch(function(error) {
            errorLog.innerHTML = errorMessage;
          });
    }else{
        errorLog.innerHTML = "Password check failed"
    }
}

function toggleSignIn(){
    document.getElementById('signin-popup').classList.remove('hide');
    document.getElementById('signup-popup').classList.add('hide');
}
