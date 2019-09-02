//메모를 넣을 곳을 선택함
var memoContainer = document.getElementById("memos");

//메모 데이터를 받아옴 (지금은 일단 json 파일로)
function loadJSON(serverLocalPath, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', serverLocalPath, true); 
    xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
    }
    };
    xobj.send(null); 
}

function dataCallback(responseText){
    console.log("[f]dataCallback");
    for(var i = 0; i < responseText.memos.length; i++){
        buildMemoHTML(responseText.memos[i]);
    }
}

function buildMemoHTML(memoObject){
    console.log("[f]buildMemoHTML");
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

loadJSON('memo-data.json', dataCallback);