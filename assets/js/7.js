$(document).ready(function () {
    $('.minOst').on('click', function () {
        buildMinOstTree();
    });

    $('.minOstReload').on('click', function () {
        $(this).hide();
        $("line,text").show();
    });
});

function minNode(newgraph, minweight, n) {
    let min = 333, min_ind;

    for (let i = 1; i <= n; i++)
        if (!newgraph[i] && minweight[i] < min) {
            min = minweight[i];
            min_ind = i;
        }
    return min_ind;
}

function buildMinOstTree() {
    let parent = [], minWeight = [], ostPoints = [], list = G.verts, n = 0;

    n = list.length - 1;

    for (let i = 1; i <= n; i++) {
        minWeight[i] = 333;
        ostPoints[i] = false;
    }
    minWeight[1] = 0;
    parent[1] = -1;

    for (let i = 0; i < n; i++) {
        let m = minNode(ostPoints, minWeight, n);
        ostPoints[m] = true;
        for (const el of list[m].edges) {
            if (!ostPoints[el[0]] && el[1] < minWeight[el[0]]) {
                minWeight[el[0]] = el[1];
                parent[el[0]] = m;
            }
        }

    }

    for (let i = 2; i <= n; i++) {
        for (const el of G.verts[i].edges) {
            if (el[0] == parent[i] || parent.indexOf(i) == el[0] || el[0] == n) continue;
            else {
                G.tempRemove(i, el[0]);
            }
        }
    }
    $(".minOstReload").show();
}