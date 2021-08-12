let string = "abc";
let number = 1;
let boolean = true;
let obj = {
    outside : {
        inside:{
            key : 'value'
        }
    }
};

console.log("평범한 로그 찍기, ,기호로 구분해서 여러개 찍기 가능");
console.log(string, number, boolean);
console.error("이건 에러메시지 입니다.");

let tbl = [
    {name:"이동원", birth:2004},
    {name:"김규태", birth:2005},
    {name:"박인환", birth:2006},
];
console.table(tbl);

console.time(".");

for(let i = 0; i < 10000000; i++){
    ;
}

console.timeEnd(".");

function b(){
    console.trace("실행 순서를 추적한다");
}

function a() {
    b();
}

a();

// 1부터 100까지 사이에 있는 소수(Prime number)를 구하고, 이걸 구하는 데 걸린 시간을
// 1과 자기자신외에는 나누어 떨어지지 않는 수
// 출력하는 JS프로그램을 작성하세요.

// a -> b ->