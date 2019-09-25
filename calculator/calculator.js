var STATE = true;

function keypress(e){
    if(STATE == true){
        var input = document.getElementById("input1");
    }else if(STATE == false){
        var input = document.getElementById("input2");
    }

    if(input.value == ""){
        input.value = e;
    }else{
        input.value += e;
    }    
}
function calcpress(){
    //연산자가 눌러졌을때
    //스테잇을 폴스로 만든다.
    //h1에 연산자 조건부 프린팅
}

console.log("calculator opened");