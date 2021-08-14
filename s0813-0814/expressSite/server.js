const http = require('http');
const path = require('path');
const express = require('express');
const { fetchCorona } = require('./node10-fetch');
const { pool } = require('./DB');   // 이렇게 가져와서 server에서 사용하면 된다.
const bodyParser = require('body-parser');

const app = express();
// 서버에 들어갈 요청에 대한 응답 함수를 만들어준다.
const server = http.createServer(app);
// 해당 익스프레스 함수를 이용해서 서버를 만들고

app.set("port", 52000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// 현재 폴더 밑에 있는 views 폴더를 app의 view 폴더로 설정을 해준다. 이 말은 모든 html을 여기에 넣겠다는 것이다.

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/post-test', (req, res) => {
    res.render("postData");
});

app.post('/post-test', (req, res) => {
    console.log(req.body);
    res.render("postData");
});

// AJAX => Asynchronous Javascript And XML
app.post('/reply', async (req, res) => {
    const { msg, name } = req.body;
    const sql = "INSERT INTO corona_reply (date, name, comment, time) VALUES (NOW(), ?, ?, NOW())";

    await pool.query(sql, [name, msg]);

    // let now = new Date();

    let list = await pool.query("SELECT * FROM corona_reply ORDER BY id DESC");
    // 얘는 페이지를 보여주는게 아니라 json을 보내줄 거라서 res.json을 사용했다.
    res.json({ list: list[0] });
});

app.get('/reply', async (req, res) => {
    let list = await pool.query("SELECT * FROM corona_reply ORDER BY id DESC");
    res.json({ list: list[0] });
});

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
    // date, total, local, world => date는 오늘날짜, total: 200, local: 120, world: 80
    // INSERT INTO corona (date, total, local, world) VALUES ('2021-08-13', 200, 120, 80);
    fetchCorona(async data => {
        let selectedData = await pool.query("SELECT * FROM corona WHERE date = ?", [data.date]);

        if (selectedData[0].length < 1) {
            pool.query(`INSERT INTO corona (date, total, local, world) VALUES (?, ?, ?, ?);`, [data.date, data.before[0], data.before[1], data.before[2]]);
        }

        res.render("corona", { data });
    });
});

// get, post

server.listen(app.get("port"), () => {
    console.log(`Express 엔진이 ${app.get("port")}번 포트에서 구동중입니다.`);
})