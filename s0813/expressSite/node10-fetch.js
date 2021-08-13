const fetch = require('node-fetch');
const fs = require('fs').promises;
const cheerio = require('cheerio');

const url = "http://ncov.mohw.go.kr/bdBoardList_Real.do";
const filename = "./index.html";

function fetchCorona(callBack) {
    fetch(url)
        .then(data => {
            return data.text();
        }).then(body => {
            let $ = cheerio.load(body); // html을 읽어서 제이쿼리 형식으로 쓸 수 있게 변환해준다.
            let value1 = getText(".inner_value", 0, $);
            let value2 = getText(".inner_value", 1, $);
            let value3 = getText(".inner_value", 2, $);

            let value4 = getText(".ca_value", 2, $);
            let value5 = getText(".ca_value", 3, $);
            let value6 = getText(".ca_value", 4, $);
            let value7 = getText(".ca_value", 5, $);
            let value8 = getText(".ca_value", 6, $);
            let value9 = getText(".ca_value", 7, $);

            let confirmCase = $(".board_top ~ .data_table tbody tr>td:nth-child(2)>span:nth-child(1)");
            let deathToll = $(".board_top ~ .data_table tbody tr>td:nth-child(3)>span:nth-child(1)");
            let recordData = {
                before: [value1, value2, value3],
                out: [value4, value5],
                in: [value6, value7],
                dead: [value8, value9],
                man: [getText(confirmCase, 0, $), getText(deathToll, 0, $)],
                woman: [getText(confirmCase, 1, $), getText(deathToll, 1, $)],
                age80: getAge($, 2),
                age60: getAge($, 3),
                age40: getAge($, 5),
                age20: getAge($, 7),
                age19: getAge($, 9),
            };

            // return fs.writeFile(filename, recordData);
            callBack(recordData);
        }).catch(err => {
            console.log(err);
            callBack(err);
        });
}

function getAge($, n) {
    let confirmCase = $(".board_top ~ .data_table tbody tr>td:nth-child(2)>span:nth-child(1)");
    let deathToll = $(".board_top ~ .data_table tbody tr>td:nth-child(3)>span:nth-child(1)");
    let f, d;
    if (n == 2) {
        f = (getText(confirmCase, n, $).split(",").join("") * 1).toLocaleString();
        d = (getText(deathToll, n, $).split(",").join("") * 1).toLocaleString();
    } else {
        f = (getText(confirmCase, n, $).split(",").join("") * 1 + getText(confirmCase, n + 1, $).split(",").join("") * 1).toLocaleString();
        d = (getText(deathToll, n, $).split(",").join("") * 1 + getText(deathToll, n + 1, $).split(",").join("") * 1).toLocaleString();
    }
    return [f, d];
}

function getText(dom, n, $) {
    return $(dom).eq(n).text().trim();
}

module.exports = {
    fetchCorona
}


// 가져온 데이터를 data/corona.html
// 기록된 후, 기록완료라는 메시지도 나오게 정정