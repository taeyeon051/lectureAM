const mysql = require('mysql2');
const secret = require('./secret'); //비밀번호 정보를 불러오고

const pool = mysql.createPool(secret); //비밀번호와 데이터베이스 정보를 기반으로 데이터베이스 풀을 만들어준다.
const promisePool = pool.promise(); //프로미스 기반의 풀로 변경해서 넣어준다.


module.exports = {
    pool: promisePool
}