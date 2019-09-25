// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyARxsoeNyFDYfC7TSLIZZIWMNY5uHQWbz8",
    authDomain: "simple-memo-15d9a.firebaseapp.com",
    databaseURL: "https://simple-memo-15d9a.firebaseio.com",
    projectId: "simple-memo-15d9a",
    storageBucket: "simple-memo-15d9a.appspot.com",
    messagingSenderId: "1017201975307",
    appId: "1:1017201975307:web:9c0d02327954a73ebaa70e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Get a reference to the database service
// Read Memos from database
var memodata = [];
firebase.database().ref('memos').once('value', function(databaseCopy){
    databaseCopy.forEach(function(childCopy){
        var childKey = childCopy.key;
        var childValue = childCopy.val();
        memodata.push(childValue);
    })
    console.log(memodata);
    dataCallback(memodata);
});

//Write Memos to database
function writeNew(){
    var writeTitle = document.getElementById("title-write").value;
    var writeContent = document.getElementById("content-write").value;
    
    firebase.database().ref('memos/'+memoCount).set({
        title: writeTitle,
        content: writeContent
    })
    writeMemoPopup.classList.add("hide");
    location.reload();
}

function deleteMemo(memoKey){

}