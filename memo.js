//메모를 넣을 곳을 선택함
var memoContainer = document.getElementById("memos");
var memoCount = 0;

//메모 데이터를 받아옴 (지금은 일단 json 파일로)

// function loadJSON(serverLocalPath, callback) {
//     var xobj = new XMLHttpRequest();
//     xobj.overrideMimeType("application/json");
//     xobj.open('GET', serverLocalPath, true); 
//     xobj.onreadystatechange = function () {
//         if (xobj.readyState == 4 && xobj.status == "200") {
//             //xobj.responseText 는 json 파일 전체이고 텍스트 형식으로 받아온다
//             //텍스트 형식인 자료를 js 내장 클래스의 메소드인 JSON.parse를 사용하여 오브젝트 형식으로 변환하여
//             //callback 펑션에 넣어줬다.
//             callback(JSON.parse(xobj.responseText.memos));
//         }
//     };
//     xobj.send(null); 
// }

function dataCallback(responseArray){
    memoCount = 0;
    for(var i = 0; i < responseArray.length; i++){
        buildMemoHTML(responseArray[i]);
        memoCount++;
    }
}

function buildMemoHTML(memoObject){
    //필요한 모든 HTML 엘리멘트를 만든다
    var memo = document.createElement("DIV");
    var titleSection = document.createElement("DIV");
    var title = document.createElement("H4");
    var contentSection = document.createElement("DIV");
    var content = document.createElement("P");

    //각자 하이라키에 맞게 구조화 한다
    titleSection.appendChild(title);
    contentSection.appendChild(content);
    memo.appendChild(titleSection);
    memo.appendChild(contentSection);

    //각 엘리멘트에 클래스를 부여한다
    memo.classList.add("memo");
    titleSection.classList.add("memo-title");
    contentSection.classList.add("memo-content");

    //필요한 데이터를 넣는다
    title.innerHTML = memoObject.title;
    content.innerHTML = memoObject.content; 

    memoContainer.appendChild(memo);
}



// loadJSON('memo-data.json', dataCallback);

var writeMemoPopup = document.getElementById("write-memo-popup");
var writeMemoButton = document.getElementById("write-new-button");
var writeMemoBack = document.getElementById("write-memo-popup-back");

writeMemoBack.onclick = function(){
    writeMemoPopup.classList.add("hide");
}
writeMemoButton.onclick = function(){
    writeMemoPopup.classList.remove("hide");
}