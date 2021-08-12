const fs = require('fs').promises;  // fs 인데 promise버전으로 임포트 된다.

let filename = "./data/readme.txt";

fs.readFile(filename)
    .then(data => {
        console.log(data.toString());
    }).catch(err => {
        console.log(err);
    });