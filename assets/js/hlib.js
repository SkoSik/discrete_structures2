class Graph {
    verts;
    points;

    constructor() {
        this.verts = []
        this.points = [];
    }

    add(a, b) {
        if (!this.verts[a]) this.verts[a] = [b];
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
let queue = [];
$(document).ready(function () {

    $('#dfs').on('click', function () {
        dfs(1);
        console.log(used);
        graph = new Graph();
        used = [];
        // $('#input').val('');
    });
    $('#add').on('click', function () {

        let a = parseInt($('#va').val(), 10);
        let b = parseInt($('#vb').val(), 10);

        if (!a || !b) return;

        graph.add(a, b);
        graph.add(b, a);

        $('#input').val($('#input').val() + a + " " + b + "\n");

    });
    $('#bfs').on('click', function(){
        bfs(1);
        // console.log(graph.verts)
        graph = new Graph();
        used = [];
        queue = [];
        // $('#input').val('');
    })
});

function dfs(v) {
    used.push(v);
    graph.verts[v].forEach(function (el) {
        if (!used.includes(el)) dfs(el);
    });
}

function  bfs(v){
    used = [];
    queue = [];
    queue.push(v);
    used[v] = true;
    while(queue.length > 0){
        let node = queue.shift();
        console.log(node);
        for(let i = 0; i < graph.verts[node].length; i++){
            if(graph.verts[node][i] && !used[graph.verts[node][i]]){
                used[graph.verts[node][i]] = true;
                queue.push(graph.verts[node][i]);
            }
        }
    }
}