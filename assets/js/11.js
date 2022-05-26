$(document).ready(function () {
    $('#prufer-ans').on('click', function () {
        prim($("#prufer-game").val());
    });
});

function prim(codePrfr) {
    G.clear();
    G.setWeighted(false);

    let nv = codePrfr.length + 2, a, b, glist = [];
    codePrfr = codePrfr.split("").map(Number);

    for (let i = 1; i < nv + 1; i++) {
        glist.push(i);
    }

    while (codePrfr.length !== 0) {
        let v;
        for (let i = 0; i < glist.length; i++) {
            if (codePrfr.indexOf(glist[i]) === -1) {
                v = i;
                break;
            }
        }

        a = codePrfr.shift();

        G.add(a, glist[v]);
        glist.splice(v, 1);
    }
    G.add(glist[0], glist[1]);
}