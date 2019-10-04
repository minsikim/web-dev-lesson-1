//URL을 저장함
var url = new URL(location.href);
var currentPage = 1;
if(url.searchParams.get('page')){
    currentPage = url.searchParams.get('page');
}
console.log(currentPage);

//메모를 넣을 곳을 선택함
var memoContainer = document.getElementById("memos");

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
function resetDiv(div){
    while (div.hasChildNodes()) {
        div.removeChild(div.childNodes[0]);
    }
}

function buildMemoCard(responseArray){
    resetDiv(memoContainer);
    for(var i = 0; i < responseArray.length; i++){
        buildMemoHTML(responseArray[i], i);
    }
    // paginationBuild();
}

function deleteClickHandler(e){
    if(e.target.dataset == undefined){
        e.target.dataset.index = 0;
    }else{
        deleteMemo(e.target.dataset.index);
        console.log(e.target.dataset.index);
    }
}

function buildMemoHTML(memoObject, index){
    //필요한 모든 HTML 엘리멘트를 만든다
    var memo = document.createElement("DIV");
    var titleSection = document.createElement("DIV");
    var title = document.createElement("H4");
    var contentSection = document.createElement("DIV");
    var content = document.createElement("P");
    var binDiv = document.createElement("DIV")
    var binImg = document.createElement("IMG");

    //각자 하이라키에 맞게 구조화 한다
    titleSection.appendChild(title);
    titleSection.appendChild(binDiv);
    binDiv.appendChild(binImg);
    contentSection.appendChild(content);
    memo.appendChild(titleSection);
    memo.appendChild(contentSection);

    //각 엘리멘트에 클래스를 부여한다
    memo.classList.add("memo");
    memo.dataset.index = index;
    titleSection.classList.add("memo-title");
    contentSection.classList.add("memo-content");
    binDiv.classList.add("delete-icon-wrapper");
    binImg.id = "icon-delete";

    //필요한 데이터를 넣는다
    title.innerHTML = memoObject.title;
    content.innerHTML = memoObject.content; 
    binImg.setAttribute('src', 'https://img.icons8.com/material/24/000000/delete-forever--v2.png');
    binImg.dataset.index = index;
    binDiv.dataset.index = index;
    binDiv.onclick = deleteClickHandler;

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


/* CLASS pagination */

// 조건들
// 1. 어떤 어래이를 받을꺼고 그걸 미리 쪼개놓고 원하는 디브에 html화 하는 콜백을 받을꺼임
// 2. 미리 쪼개놓은 어래이로 페이지의 크기와 페이지의 갯수를 파악한 다음 패지네이션을 html 화 하는 메소드가 있을꺼임 
// 3. 페이지를 url화 하는 방법이 있을꺼고, onclick 으로 받아서 js 가 리프레쉬 하는 방법 있을 것임




// pagination 동적 생성
// 0. 가지고 있는 리스트 데이터를 원하는 사이즈로 쪼개놔야 한다.
// listSize 한페이지에 표시할 최대 글 수
var listPage = [];
var listSize = 6;

function paginationBuild(){
}

var paginationConfig = {
    listDiv : memoContainer, 
    listData: lastDataCopy,
    paginationDiv : document.getElementById("pagination"),
    listSize: 6,
    currentPage: url.searchParams.get('page') ? url.searchParams.get('page') : 1
}

class Pagination{
    constructor(config){
        this.listDiv = config.listDiv;
        this.listData = config.listData;
        this.listSize = config.listSize;
        this.paginationDiv = config.paginationDiv;

        this.currentPage = currentPage;
    }
    
    updateData(){
        this.listData = lastDataCopy;
    }
    changeListSize(size){
        this.listSize = size;
        this.updateData();
        this.build();
    }
    build(){
        resetDiv(this.paginationDiv);
        var subListSize = Math.ceil(this.listData.length / listSize);
        for(var i = 0; subListSize > i; i++){
            var tempArr = [];
            for(var j = 0; listSize > j; j++){
                if(this.listData[(i*listSize)+j]){
                    tempArr.push(this.listData[(i*listSize)+j])
                }else{
                    break;
                }
            }
            listPage.push(tempArr);
        }

        // 1. pagination을 넣을 div가 필요
        
        // 2. 그 안에 ul을 생성
        var pUl = document.createElement("UL");
        this.paginationDiv.appendChild(pUl);
    
        // 3. 그 안에 li > a 필요한 페이지 갯수 만큼 생성
        if(currentPage > 1){
            var prevLi = document.createElement("LI");
            var prevA = document.createElement("A");
            pUl.appendChild(prevLi);
            prevLi.appendChild(prevA);
            prevA.href = "?page="+(currentPage - 1);
            prevA.innerHTML = "<";
        }
        //subListSize 는 내 전체 데이터중 현재 표시해야되는 페이지의 리스트로 쪼개놓은 것
        for(var i = 0; subListSize > i; i++){
            var tempLi = document.createElement("LI");
            var tempA = document.createElement("A");
            tempLi.appendChild(tempA);
            tempA.href = "?page="+(i+1);
            tempA.innerHTML = (i+1);
            pUl.appendChild(tempLi);
        }
        // 4. 앞 뒤로 prev, next li 생성
        //listPage 는 뭔가 내 데이터를 쪼개서 넣어놓은 어레이
        if(listPage.length > 1){
            var nextLi = document.createElement("LI");
            var nextA = document.createElement("A");
            pUl.appendChild(nextLi);
            nextLi.appendChild(nextA);
            nextA.href = "?page="+(currentPage + 1);
            nextA.innerHTML = ">";
        }
    }

}



var myPagination = new Pagination(paginationConfig);
// myPagination.build();
