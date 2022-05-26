function countComponentClosed() {
    used=[];
    let komponents = 0;
    for(const el of G.verts){
        if (el!=undefined && !used.includes(el.id)) {
            dfs(el.id);
            komponents++;
        }
    }
    return komponents;
}

$(document).ready(function () {
    $(document).on("click", "#component", function () {
        $('#component-answer').text(countComponentClosed());
    });

    $(document).on("click", "#component-ans", function () {
        if ($("#component-game").val() == countComponentClosed()) {
            $("#component-answer2").text("Правильно").css({color: "green"});
        } else $("#component-answer2").text("Неправильно").css({color: "red"});
    });
});

