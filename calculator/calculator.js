// CALC_STATE : false일때 input1에 입력, true 일때 input2에 입력.
var CALC_STATE = false;

var input1 = document.getElementById('input1');
var input2 = document.getElementById('input2');
var result = document.getElementById('result');

function keypress(key){

    if(key == 'delete'){
        input1.value = "";
    }else if(key == '+'){
        result.children[0].innerHTML = parseInt(input1.value) + parseInt(input2.value);
    }else if(key == '-'){
        result.children[0].innerHTML = parseInt(input1.value) - parseInt(input2.value);
    }else{

        if(CALC_STATE == true){
            if(input2.value != ""){
                input2.value = input2.value + key;
            }else{
                input2.value = key;
            }
        }else if(CALC_STATE == false){
            if(input1.value != ""){
                input1.value = input1.value + key;
            }else{
                input1.value = key;
            }
        }
    }
    console.log(key);
}




// 1. 인풋1,2와 리절트를 잡는다.
var input1 = document.getElementById('input1');
var input2 = document.getElementById('input2');
var result = document.getElementById('result');
// 2. 키프레스라는 펑션으로 모든 버튼 기능을 통합한다.
function keypress(key){
// 3. 키플레스의 매개변수에 따라 숫자/연산자/딜리트로 나누어 기능을 수행한다.
    //조건문
    if(true){
        processNumbers();
    }else if(true){
        processCalc();
    }else{
        processDelete();
    }
}
// 4. 숫자, 연산자, 딜리트 의 각 펑션을 분리하여 작성한다.
function processNumbers(){

}
function processCalc(){

}
function processDelete(){

}

// 5. 
