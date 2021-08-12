let i = 0;
setInterval(function () {
    if (i >= 5) {
        console.log("종료");
        process.exit();
    }
    i++;
    console.log(`i번째 실행중 : ${i}`);
}, 1000);