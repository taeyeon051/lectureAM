const fs = require('fs').promises;

let str = `집가고 싶어`;
let filename = "./data/write.txt";

fs.writeFile(filename, str)
    .then(() => {
        return fs.readFile(filename);
    }).then(data => {
        console.log(data.toString());
    }).catch(err => {
        console.log(err);
    });

// fs.writeFile(filename, str, err => {
//     console.log("파일이 성공적으로 기록되었습니다.");
//     fs.readFile(filename, (err, data) => {
//         if (err) console.log(err);
//         else console.log(data.toString());
//     })
// });