var lastDataCopy = [];

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
firebase.database().ref('memos/'+currentUser.uid).once('value', function(databaseCopy){
    lastDataCopy = databaseCopy.val();
    console.log(lastDataCopy);
    regenMemo();
});

//Write Memos to database
function writeNew(){
    var writeTitle = document.getElementById("title-write").value;
    var writeContent = document.getElementById("content-write").value;
    
    lastDataCopy.push({
        title: writeTitle,
        content: writeContent
    })

    updateDatabase();
    writeMemoPopup.classList.add("hide");
    document.getElementById("title-write").value = "";
    document.getElementById("content-write").innerHTML = "";
}

function deleteMemo(index){
    lastDataCopy.splice(index, 1);
    updateDatabase();
}

function regenMemo(){
    // *TODO* 나중에 항상 여기서 lastDataCopy를 Pagination Class 에서 update하는 함수가 필요함
    myPagination = new Pagination(paginationConfig);
    buildMemoCard(myPagination.listPage[myPagination.currentPage - 1]);
    myPagination.build();
}

function updateDatabase(){
    firebase.database().ref('memos'+currentUser.uid).set(lastDataCopy, regenMemo);
}