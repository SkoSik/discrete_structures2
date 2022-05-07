class Graph {
    verts;
    points;

    constructor() {
        this.verts = [];
        this.points = [];
    }

    add(a, b) {
        if (!this.verts[a]) this.verts[a] = [b];
        else this.verts[a].push(b);
        if (!this.verts[b]) this.verts[b] = [a];
        else this.verts[a].push(b);
    }
}

class Point {
    x;
    y;
    c;

    constructor(x, y, c) {
        this.x = x;
        this.y = y;
        this.c = c;
    }

}

let graph = new Graph();
let used = [];
$(document).ready(function () {

    $('#dfs').on('click', function () {
        dfs(1);
        console.log(used);
        graph = new Graph();
        used = [];
    });

    $('#add').on('click', function () {
        let a = parseInt($('#va').val(), 10);
        let b = parseInt($('#vb').val(), 10);

        if (!a || !b) return;

        graph.add(a, b);
        graph.add(b, a);

        $('#input').val($('#input').val() + a + " " + b + "\n");
    });
});

function dfs(v) {
    used.push(v);
    graph.verts[v].forEach(function (el) {
        if (!used.includes(el)) dfs(el);
    });
}