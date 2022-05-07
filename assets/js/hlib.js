$(document).ready(function () {
    console.log("кирич лох");
});

class Graph {
    verts;
    points;

    constructor() {
        this.verts = [];
        this.points = [];
    }
    add(a, b) {
        if(!this.verts[a]) this.verts[a] = [b];
        else this.verts[a].push(b);
        if(!this.verts[b]) this.verts[b] = [a];
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

let used = [];
let graph = new Graph();
graph.add(1,2);
graph.add(1,3);
graph.add(1,4);
graph.add(2,3);

console.log(graph.verts);
dfs(1);
console.log(used);


function dfs(v) {
    used.push(v);
    graph.verts[v].forEach(function(el){
        if(!used.includes(el)) dfs(el);
    });
}