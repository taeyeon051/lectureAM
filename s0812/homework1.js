console.time("걸린 시간");

for(let i =2;i < 100;i++){
    let divideCnt = 0;
    for(j= 2;j< i-1; j++){
        if(i % j == 0) {
            divideCnt++;
        }
    }
    if(divideCnt == 0) {
        console.log(i);
    }
}

console.timeEnd("걸린 시간");
