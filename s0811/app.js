$(() => {
    $("#click").on("click", e => {
        alert("click");
        console.log(e);
    });

    $("#dblclick").on("dblclick", e => {
        alert("dblclick");
        console.log(e);
    });

    $("#hover").hover(e => {
        alert("hover");
        console.log(e);
    });

    $("#mousedown").on("mousedown", e => {
        alert("mousedown");
        console.log(e);
    });

    $("#mouseenter").on("mouseenter", e => {
        alert("mouseenter");
        console.log(e);
    });

    $("#mouseleave").on("mouseleave", e => {
        alert("mouseleave");
        console.log(e);
    });

    $("#mousemove").on("mousemove", e => {
        alert("mousemove");
        console.log(e);
    });

    $("#mouseout").on("mouseout", e => {
        alert("mouseout");
        console.log(e);
    });

    $("#mouseover").on("mouseover", e => {
        alert("mouseover");
        console.log(e);
    });

    $("#mouseup").on("mouseup", e => {
        alert("mouseup");
        console.log(e);
    });
});