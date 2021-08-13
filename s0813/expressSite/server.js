const http = require('http');
const path = require('path');
const express = require('express');
const { fetchCorona } = require('./node10-fetch');

const app = express();
// 서버에 들어갈 요청에 대한 응답 함수를 만들어준다.
const server = http.createServer(app);
// 해당 익스프레스 함수를 이용해서 서버를 만들고

app.set("port", 52000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// 현재 폴더 밑에 있는 views 폴더를 app의 view 폴더로 설정을 해준다. 이 말은 모든 html을 여기에 넣겠다는 것이다.

app.use(express.static(path.join(__dirname, 'public')));

app.get("/msg", (req, res) => {
    let msgs = [
        "추성현은 현재 과제를 하나도 안보여주고 있습니다.",
        "김규태는 오늘도 기만질을 합니다.",
        "이동원은 여전히 졸고 있습니다.",
        "박인환은 들어와만 있습니다.",
        "이주성은 잘 자고 있습니다."
    ];

    // Math.random()은 0 ~ 1 까지의 랜덤 값을 만들어 낸다.
    // let idx = Math.floor(Math.random() * msgs.length);

    let idx = req.query.idx * 1;
    let msg = "";
    if (msgs[idx] === undefined) msg = "해당하는 문장은 없습니다.";
    else msg = msgs[idx];

    res.render("index", { msg });
});

app.get("/corona", (req, res) => {
    fetchCorona(data => {
        console.log(data);
        res.render("corona", { data });
    });
});

// get, post

server.listen(app.get("port"), () => {
    console.log(`Express 엔진이 ${app.get("port")}번 포트에서 구동중입니다.`);
})