//URL을 저장함
var url = new URL(location.href);

//메모를 넣을 곳을 선택함
var memoContainer = document.getElementById("memos");

function resetDiv(div){
    while (div.hasChildNodes()) {
        div.removeChild(div.childNodes[0]);
    }
}

function buildMemoCard(responseArray){
    resetDiv(memoContainer);
    console.log(responseArray);
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

var writeMemoButton = document.getElementById("write-new-button");
var writeMemoPopup = document.getElementById("write-memo-popup");
var writeMemoBack = document.getElementById("write-memo-popup-back");
var signInPopup = document.getElementById("signin-popup");
var signInBack = document.getElementById("signin-popup-back");
var signInButton = document.getElementById("menu-button");

writeMemoBack.onclick = function(){
    writeMemoPopup.classList.add("hide");
}
writeMemoButton.onclick = function(){
    writeMemoPopup.classList.remove("hide");
}
signInBack.onclick = function(){
    signInPopup.classList.add("hide");
}
signInButton.onclick = function(){
    signInPopup.classList.remove("hide");
}


/* CLASS pagination */

// 조건들
// 1. 어떤 어래이를 받을꺼고 그걸 미리 쪼개놓고 원하는 디브에 html화 하는 콜백을 받을꺼임
// 2. 미리 쪼개놓은 어래이로 페이지의 크기와 페이지의 갯수를 파악한 다음 패지네이션을 html 화 하는 메소드가 있을꺼임 
// 3. 페이지를 url화 하는 방법이 있을꺼고, onclick 으로 받아서 js 가 리프레쉬 하는 방법 있을 것임

// pagination 동적 생성
// 0. 가지고 있는 리스트 데이터를 원하는 사이즈로 쪼개놔야 한다.
// listSize 한페이지에 표시할 최대 글 수

var paginationConfig = {
    listDiv : memoContainer, 
    paginationDiv : document.getElementById("pagination"),
    listSize: 20,
    currentPage: url.searchParams.get('page') ? parseInt(url.searchParams.get('page')) : 1
}

// class는 정의문들의 집합이다.
// constructor 또한 생성시 실행되는 펑션을 정의 할 뿐 실행문이 아님.
// 

class Pagination{
    constructor(config){
        this.listDiv = config.listDiv;
        this.listSize = config.listSize;
        this.paginationDiv = config.paginationDiv;
        this.listPage = [];
        this.currentPage = config.currentPage;
        this.listData = this.updateData();
        this.subListSize = this.setSublistSize();
        this.listPage = this.setListPage();
        this.checkPageNumber();
        
    }
    checkPageNumber(){
        if(this.listPage.length < this.currentPage){
            location.href = "/memo.html";
        }
    }
    setSublistSize(){
        return Math.ceil( this.listData.length / this.listSize );
    }
    setListPage(){
        var tempListPage = [];
        for(var i = 0; this.subListSize > i; i++){
            var tempArr = [];
            for(var j = 0; this.listSize > j; j++){
                if(this.listData[(i * this.listSize) + j]){
                    tempArr.push(this.listData[( i * this.listSize ) + j])
                }else{
                    break;
                }
            }
            tempListPage.push(tempArr);
        }
        // console.log(tempListPage);
        return tempListPage;
    }
    updateData(){
        return lastDataCopy;
    }
    update(lastDataCopy){
        this.listData = lastDataCopy;
        this.setSublistSize();
        this.setListPage();
        this.build();
    }
    changeListSize(size){
        this.listSize = size;
        this.updateData();
        this.build();
    }
    build(){
        resetDiv(this.paginationDiv);
        // 1. pagination을 넣을 div가 필요
        
        // 2. 그 안에 ul을 생성
        var pUl = document.createElement("UL");
        this.paginationDiv.appendChild(pUl);
    
        // 3. 그 안에 li > a 필요한 페이지 갯수 만큼 생성
        if(this.currentPage > 1){
            var prevLi = document.createElement("LI");
            var prevA = document.createElement("A");
            pUl.appendChild(prevLi);
            prevLi.appendChild(prevA);
            prevA.href = "?page="+(this.currentPage - 1);
            prevA.innerHTML = "<";
        }
        //subListSize 는 내 전체 데이터중 현재 표시해야되는 페이지의 리스트로 쪼개놓은 것
        for(var i = 0; this.subListSize > i; i++){
            var tempLi = document.createElement("LI");
            var tempA = document.createElement("A");
            tempLi.appendChild(tempA);
            tempA.href = "?page="+(i+1);
            tempA.innerHTML = (i+1);
            pUl.appendChild(tempLi);
        }
        // 4. 앞 뒤로 prev, next li 생성
        //listPage 는 뭔가 내 데이터를 쪼개서 넣어놓은 어레이
        if(this.listPage.length > this.currentPage){
            var nextLi = document.createElement("LI");
            var nextA = document.createElement("A");
            pUl.appendChild(nextLi);
            nextLi.appendChild(nextA);
            nextA.href = "?page="+(this.currentPage + 1);
            nextA.innerHTML = ">";
        }
    }

}



// var myPagination = new Pagination(paginationConfig);
// myPagination.build();


//어레이, 스트링, 오브젝트, Math, Date 정도는 도큐멘테이션을 따라서 내장함수들을 한번 써보는거
// 어레이가 있음


// 클릭시 어레이에서 뭔가를 불러와서 


// 뭔가를 함.
