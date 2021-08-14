// 자바스크립트 작업 == 함수
// resolve와 reject는 함수로 넣어진다.

function Test(value) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(value + 2);
        }, 2000);
    });
}

// async => 비동기
async function awaitTest() {
    let value = await Test(4);
    console.log(value);
}

awaitTest();


// Test(4).then(data => {
//     console.log(data);
// });






// let p1 = new Promise((res, rej) => {
//     // 여기다가 뭔가 시간이 걸리는 작업을 수행해.
//     // 그리고 나서 작업이 모두 끝났다면 resolve를 호출하고, 작업을 하다가 실패했다면 reject
//     setTimeout(() => {
//         console.log("2초가 종료되었습니다.");
//         res("Hello Promise");
//     }, 2000);
// });

// p1.then(data => {
//     console.log(data);
// })