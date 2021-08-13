const http = require('http');
// 노드에 기본적으로 내장되어 있는 http 서버를 만들기 위한 모듈

const { fetchCorona } = require('./node10-fetch');

// 수정이 있은 후에는 반드시 서버를 껐다가 켜야 한다.
const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    // let data = `<h1>서버가 실행중입니다.</h1>`;
    // res.end(data);

    fetchCorona(data => {
        console.log(data);
        let html =
            `<div>
                <div class="data-div">
                    <div class="title">
                        <h4>전일대비</h4>
                    </div>
                    <div class="content">
                        소계 : ${data.before[0]}, 국내발생 : ${data.before[1]}, 해외유입 : ${data.before[2]}
                    </div>
                </div>
                <div class="data-div">
                    <div class="title">
                        <h4>격리해제</h4>
                    </div>
                    <div class="content">
                        누적 : ${data.out[0]}, 전일대비 : ${data.out[1]}
                    </div>
                </div>
                <div class="data-div">
                    <div class="title">
                        <h4>격리</h4>
                    </div>
                    <div class="content">
                        누적 : ${data.in[0]}, 전일대비 : ${data.in[1]}
                    </div>
                </div>
                <div class="data-div">
                    <div class="title">
                        <h4>사망</h4>
                    </div>
                    <div class="content">
                        누적 : ${data.dead[0]}, 전일대비 : ${data.dead[1]}
                    </div>
                </div>
            </div>`;
        res.end(html);
    });
});
// 이렇게 하면 http웹서버 객체가 생성되서 server 변수에 들어간다.

server.listen(52000, () => {
    console.log("서버가 52000번 포트에서 구동중입니다.");
});
// 서버의 listen은 2개의 매개변수가 들어간다.
// 1번은 포트번호 : 0 ~ 1023 번까지는 well known 포트 2바이트 1024 ~ 65535
// 2번은 서버 구동 후 콜백 함수