const log = console.log;

$(() => {
    const imgList = $(".slide-image");
    let current = 0;
    let isSlide = false;

    slide(0, 0);
    imgList.css({ "left": "200%" });

    let nextBtn;
    $(".slide-btn").each((i, btn) => { if ($(btn).data("dir") == 1) nextBtn = btn; });
    let interval = setInterval(() => { slide(current + 1, 1); }, 5000);

    function slide(target, dir) {
        if (isSlide) return;
        isSlide = true;
        $(".slide-btn").attr("disabled", true);

        if (target < 0) target = 6;
        else if (target >= imgList.length) target = 0;

        $(imgList).eq(current).css({ "left": 0 }).animate({ "left": `${dir * -100}%` }, 800, () => { changeFalse(); });
        $(imgList).eq(changeNumber(current - 1)).css({ "left": '-100%' }).animate({ "left": `${(dir + 1) * -100}%` }, 800, () => { changeFalse(); });
        $(imgList).eq(changeNumber(current + 1)).css({ "left": '100%' }).animate({ "left": `${(dir - 1) * -100}%` }, 800, () => { changeFalse(); });
        if (dir < 0) $(imgList).eq(changeNumber(target - 1)).css({ "left": '-200%' }).animate({ "left": "-100%" }, 800, () => { changeFalse(); });
        else $(imgList).eq(changeNumber(target + 1)).css({ "left": '200%' }).animate({ "left": "100%" }, 800, () => { changeFalse(); });

        current = target;

        $(".nowSlide").text((current + 1) + '/ 7');
        // $(".pin").removeClass("active");
        // $(".pin").eq(target).addClass("active");
    }

    function changeFalse() {
        isSlide = false;
        $(".slide-btn").attr("disabled", false);
    }

    function changeNumber(num) {
        if (num < 0) return imgList.length - 1;
        else if (num >= imgList.length) return 0;
        else return num;
    }

    $(".slide-btn").on("click", function () {
        let dir = $(this).data("dir") * 1;
        slide(current + dir, dir);
    });

    const startBtn = $("#start-btn");
    const stopBtn = $("#stop-btn");
    $(startBtn).css({ "display": "none" });
    
    $(startBtn).on("click", () => {
        $(startBtn).css({ "display": "none" });
        $(stopBtn).css({ "display": "flex" });
        log(interval);
        interval = setInterval(() => { slide(current + 1, 1); }, 5000);
    });
    
    $(stopBtn).on("click", () => {
        $(stopBtn).css({ "display": "none" });
        $(startBtn).css({ "display": "flex" });
        clearInterval(interval);
    });

    // $(".pin").on("click", function () {
    //     let idx = $(this).index();
    //     slide(idx, idx - current < 0 ? -1 : 1);
    // });
});