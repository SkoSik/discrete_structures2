class Graph {
    verts;

    constructor() {
        this.verts = [];
    }

    add(a, b) {
        if (!this.verts[a]) this.verts[a] = [b];
        else this.verts[a].push(b);
        if (!this.verts[b]) this.verts[b] = [a];
        else this.verts[b].push(a);
    }
}

let g = new Graph(), used = [];
$(document).ready(function () {
    g.add(1, 2);
    g.add(1, 3);
    g.add(1, 4);
    g.add(5, 6);
    g.add(5, 7);
    g.add(5, 8);
    g.add(9, 10);
    $('#btn').on('click', function () {
        prim();
    });
});

function dfs(v) {
    used.push(v);
    g.verts[v].forEach(function (el) {
        if (!used.includes(el)) dfs(el);
    });
}

function prim() {
    let komponents = 0;
    g.verts.forEach(function (el, index) {
        if (!used.includes(index)) {
            dfs(index);
            komponents++;
        }
    });
    console.log(komponents);
}