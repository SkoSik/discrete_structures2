$(document).ready(function () {
    $('#prufer').on('click', function () {
        prufer();
    });
});

function prufer() {
    let codePrfr = "", min = 1000, nv = G.verts.length - 1, uv;
    let list = G.verts;
    while (nv > 2) {
        for (let i = 1; i < list.length; i++) {
            list[i].edges.sort((a, b) => a[0] > a[b] ? a : b);
            if (list[i].edges.length === 1) {
                min = Math.min(min, i);
            }
        }

        uv = list[min].edges[0][0];
        codePrfr += uv;

        list[min].remove(uv);
        list[uv].remove(min);

        min = 1000;
        nv--;
    }

    $("#prufer-answer").text(codePrfr);
}