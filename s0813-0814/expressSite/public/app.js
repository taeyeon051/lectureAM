$(() => {
    $("#upload").on("click", () => {
        let name = $("#name").val();
        let msg = $("#msg").val();

        console.log(name, msg);
        // /reply
        $.ajax({
            url: '/reply',
            method: 'post',
            data: { name, msg },
            success: data => {
                drawList(data.list);
            }
        });
    });

    function loadReply() {
        $.ajax({
            url: '/reply',
            method: 'get',
            success: data => {
                drawList(data.list);
            }
        });
    }

    function drawList(list) {
        $(".reply-list").empty();
        for (let i = 0; i < list.length; i++) $(".reply-list").append(`<h1>${list[i].name} : ${list[i].comment}</h1>`);
    }

    loadReply();
});