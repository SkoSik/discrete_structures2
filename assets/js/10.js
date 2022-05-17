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

let g = new Graph();
$(document).ready(function () {
    g.add(1, 2);
    g.add(1, 3);
    g.add(3, 6);
    g.add(3, 7);
    g.add(2, 5);
    g.add(2, 4);
    g.add(4, 8);
    $('#btn').on('click', function () {
        prim();
    });
});

function prim() {
    let codePrfr = "", min = 50, nv = g.verts.length - 1, uv;
    while (nv > 2) {
        for (let i = 1; i < g.verts.length; i++) {
            if (g.verts[i].length === 1) {
                min = Math.min(min, i);
                console.log(min);
            }
        }
        uv = g.verts[min][0];
        codePrfr += uv;
        g.verts[min].splice(g.verts[min].indexOf(uv), 1);
        g.verts[uv].splice(g.verts[uv].indexOf(min), 1);
        min = 50;
        nv--;
    }
    console.log(g.verts);
    console.log(codePrfr);
}