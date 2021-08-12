const fetch = require('node-fetch');
const fs = require('fs').promises;
const cheerio = require('cheerio');

const url = "http://ncov.mohw.go.kr/bdBoardList_Real.do";
const filename = "./index.html";

fetch(url)
    .then(data => {
        return data.text();
    }).then(body => {
        let $ = cheerio.load(body); // html을 읽어서 제이쿼리 형식으로 쓸 수 있게 변환해준다.
        let value1 = $(".inner_value").eq(0).text().trim();
        let value2 = $(".inner_value").eq(1).text().trim();
        let value3 = $(".inner_value").eq(2).text().trim();

        let value4 = $(".ca_value").eq(2).text().trim();
        let value5 = $(".ca_value").eq(3).text().trim();
        let value6 = $(".ca_value").eq(4).text().trim();
        let value7 = $(".ca_value").eq(5).text().trim();
        let value8 = $(".ca_value").eq(6).text().trim();
        let value9 = $(".ca_value").eq(7).text().trim();

        let recordData =
            `<title>코로나 현황 (0110 김태연)</title>
            <h1>전일대비 현황</h1>
            소계 : ${value1}, 국내발생 : ${value2}, 해외유입 : ${value3}
            <p>격리해제</p>
            누적 : ${value4}, 전일대비 : ${value5}
            <p>격리중</p>
            누적 : ${value6}, 전일대비 : ${value7}
            <p>사망</p>
            누적 : ${value8}, 전일대비 : ${value9}`;

        return fs.writeFile(filename, recordData);
    }).then(() => {
        console.log("기록 완료");
    }).catch(err => {
        console.log(err);
    });

// 가져온 데이터를 data/corona.html
// 기록된 후, 기록완료라는 메시지도 나오게 정정