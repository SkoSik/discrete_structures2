let g = new Graph();
$(document).ready(function () {
    g.add(1,2,11);
    g.add(1,3,4);
    g.add(1,4,5);
    g.add(2,5,3);
    g.add(3,5,100);
    g.add(4,5,1);
    $('#btn').on('click', function (){
        let s = $('#start').val(), f = $('#finish').val();
        deijkstra(s,f);
    });
});
function deijkstra(start, finish){
    let n = 0, list = g.verts;
    for(let i = 0; i < list.length; i++)
        if(list[i] !== undefined)
            n++;
    let d = [], used = [], parent = [];
    for(let i = 1; i <= n; i++){
        d[i] = Number.MAX_VALUE;
    }
    d[start] = 0;
    console.log(list);
    console.log(d);
    for(let u = 0; u < n; u++){
        let mn = Number.MAX_VALUE, v;
        for(let i = 1; i <= n; i++)
            if(!used[i] && d[i] < mn){
                mn = d[i];
                v = i;
            }
        used[v] = 1;
        for(let i = 0; i < list[v].length; i++){
            // console.log(list[v][i].b);
            // console.log(d[v] + list[v][i].weight, d[list[v][i].b], list[v][i].b, v);
            // console.log(d);
            if(d[v] + list[v][i].weight < d[list[v][i].b])
                d[list[v][i].b] = d[v] + list[v][i].weight;
        }
    }
    console.log(d[finish]);
    $('#graphout').val(d[finish]);
}