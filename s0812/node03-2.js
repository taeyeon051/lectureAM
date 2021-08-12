let node03 = require('./node03');

function checkNumber(num) {
    if (num % 2 == 0) console.log(node03.even);
    else console.log(node03.odd);
}

// 노드는 웹브라우저 환경이 아니기 때문에 document와 window객체가 없다.
// 대신 기본적인 것들은 global객체가 가지고 있다.

checkNumber(10);
checkNumber(9);