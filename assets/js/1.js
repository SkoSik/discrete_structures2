function dfs(v) {
    used.push(v);
    for (const el of G.verts[v].edges.sort((a, b) => a[0] > a[b] ? a : b)) {
        if (!used.includes(el[0])) dfs(el[0]);
    }
}

function bfs(v) {
    used = [v];
    queue = [v];
    while (queue.length > 0) {
        let node = queue.shift();

        for (const el of G.verts[node].edges.sort((a, b) => a[0] > a[b] ? a : b)) {
            if (!used.includes(el[0])) {
                used.push(el[0]);
                queue.push(el[0]);
            }
        }
    }
}

async function anim() {
    for (const el of used) {
        $('.point[value="' + el + '"]').css({background: "green"});
        await sleep(1000);
    }
}

$(document).ready(function () {

    $(document).on("click", "#dfs", function () {
        $('.point').css({background: "white"});
        used = [];
        dfs(parseInt($("#dfs-number").val()));
        anim();
    });

    $(document).on("click", "#dfs-ans", function () {
        $('.point').css({background: "white"});
        let temp = genGraph(0, $("#dfs-game").val());
        dfs(parseInt($("#dfs-inp").text()));

        if (temp.toString() === used.toString()) {
            $("#dfs-answer").text("Правильно").css({color: "green"});
        } else $("#dfs-answer").text("Неправильно").css({color: "red"});

        anim();

        while (true) {
            let t = Math.round(Math.random() * (G.verts.length - 1));
            if (t != parseInt($("#dfs-inp").text()) && t != 0) {
                $("#dfs-inp").text(t);
                break;
            }
        }

        used = [];
    });

    $(document).on("click", "#bfs", function () {
        $('.point').css({background: "white"});
        used = [];
        bfs(parseInt($("#bfs-number").val()));
        anim();
    });

    $(document).on("click", "#bfs-ans", function () {
        $('.point').css({background: "white"});
        let temp = genGraph(0, $("#bfs-game").val());
        bfs(parseInt($("#bfs-inp").text()));

        if (temp.toString() === used.toString()) {
            $("#bfs-answer").text("Правильно").css({color: "green"});
        } else $("#bfs-answer").text("Неправильно").css({color: "red"});

        anim();

        while (true) {
            let t = Math.round(Math.random() * (G.verts.length - 1));
            if (t != parseInt($("#bfs-inp").text()) && t != 0) {
                $("#bfs-inp").text(t);
                break;
            }
        }

        used = [];
    });
});