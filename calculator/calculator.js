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


/* 

    변수 var(variable) / namespace / pointer
    펑션 function / method
    - 매개변수 / parameter
    - 반환값 return
    클래스 class / object
    - constructor(처음 실행되는 js가 사전에 설정해 놓은 펑션이 있다)
    - this 클래스 자신을 가르킨다.
    - new / instance를 만들 수 있고
    - instance는 정의한 클래스의 특정 속성을 가진 복사본이다.
    - 클래스는 펑션과 다르게 instance로 만들어야만 기능을 수행한다.

    선언(문법) 과 사용(다양한 사용 예)

    체크 typeof

    document / DOM 
    window

*/

/* 
    < 데이터타입들 >
    number
    boolean
    string
    array
    object

    undefined = 변수로 선언이 안됬음
    null = 억지로 아무 값도 갖지 않게
*/