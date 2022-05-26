$(document).ready(function () {
    $('#deijkstra').on('click', function () {
        let s = parseInt($('#start-deijkstra').val()), f = parseInt($('#finish-deijkstra').val());
        deijkstra(s, f);
    });
});

function deijkstra(start, finish) {
    let n, list = G.verts;
    n = G.verts.length - 1;

    let d = [], used = [], parent = [];
    for (let i = 1; i <= n; i++) {
        d[i] = Number.MAX_VALUE;
    }
    d[start] = 0;

    for (let u = 0; u < n; u++) {
        let v = -1;
        for (let i = 1; i <= n; i++)
            if (!used[i] && (v == -1 || d[i] < d[v]))
                v = i;

        if (d[v] == Number.MAX_VALUE) break;
        used[v] = true;

        for (let i = 0; i < list[v].edges.length; ++i) {
            let t = list[v].edges[i][0];
            let w = list[v].edges[i][1];
            if (d[v] + w < d[t]) {
                d[t] = d[v] + w;
                parent[t] = v;
            }
        }
    }

    $("#deijkstra-answer").text(d[finish]);

    let antiremove = [];
    let i = finish;
    while (i != start) {
        antiremove.push(i);
        i = parent[i];
    }
    antiremove.push(i);

    for (let i = 1; i <= n; i++) {
        for (const el of G.verts[i].edges) {
            if (antiremove.includes(i) && antiremove.includes(el[0])) continue;
            else G.tempRemove(i, el[0]);
        }
    }

    $(".minOstReload").show();
}