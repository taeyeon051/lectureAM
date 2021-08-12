// let timeOutId = setTimeout(function(){
//     console.log("1.5초 후에 실행됩니다.");
// }, 1500);

// let intervalId = setInterval(function() {
//     console.log("0.3초마다 인터벌");
// }, 300);


// setTimeout(function(){
//     clearTimeout(timeOutId);
//     clearInterval(intervalId);
// }, 2000);

let im = setImmediate(function(){
    console.log("즉시 실행");
});

// console.log("즉시 실행");

for(let i = 0; i < 10000000000; i++){
    ;
}

console.log("실행 종료")

