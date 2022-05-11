let g = new Graph();
let f = new Graph();
$(document).ready(function () {
    g.add(1,2,11);
    g.add(1,3,4);
    g.add(1,4,5);
    g.add(2,5,3);
    g.add(3,5,100);
    g.add(4,5,1);
    $('#ost').on('click', function (){
        prim();
    });
});
function minNode(newgraph, minweight, n){
    let min = 333, min_ind;

    for(let i = 1; i <= n; i++)
        if(!newgraph[i] && minweight[i] < min) {
            min = minweight[i];
            min_ind = i;
        }
    return min_ind;
}
function prim(){
    let parent = [], minWeight = [], ostPoints = [], list = g.verts, n = 0;

    for(let i = 0; i < list.length; i++)
        if(list[i] !== undefined)
            n++;

    for(let i = 1; i <= n; i++){
        minWeight[i] = 333;
        ostPoints[i] = false;
    }
    minWeight[1] = 0;
    parent[1] = -1;
    console.log(minWeight, ostPoints, g);
    // for(let j = 0; j < list[1].length; j++) {
    //     console.log(list[1][j].b, list[1][j].weight);
    // }
    for(let i = 0; i < n; i++){
        let m = minNode(ostPoints, minWeight, n);
        ostPoints[m] = true;
        for(let j = 0; j < list[m].length; j++)
            if(!ostPoints[list[m][j].b] && list[m][j].weight < minWeight[list[m][j].b]){
                minWeight[list[m][j].b] = list[m][j].weight;
                parent[list[m][j].b] = m;
            }

    }

    console.log("Ребро \t Вес");
    for(let i = 2; i <= n; i++){
        console.log(parent[i] + " - " + i + "\t " + minWeight[i]);
    }

    $('#graphout').val("Ребро \t Вес\n");
    for(let i = 2; i <= n; i++){
        $('#graphout').val($('#graphout').val() + parent[i] + " - " + i + "\t " + minWeight[i] + "\n")
    }
}