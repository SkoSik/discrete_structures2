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

let g = new Graph(), codePrfr = "233124";
$(document).ready(function () {
    $('#btn').on('click', function () {
        prim();
    });
});

function prim() {
    let nv = codePrfr.length + 2, anticode = "", a, b, arr_codePrfr = [], arr_anticode = [];
    for (let i = 1; i < nv + 1; i++) {
        if (codePrfr.indexOf(i) === -1) {
            anticode += i;
        }
    }
    codePrfr = codePrfr.split("");
    anticode = anticode.split("");
    for (let i = 0; i < codePrfr.length; i++) {
        arr_codePrfr[i] = Number(codePrfr[i]);

    }
    for (let i = 0; i < anticode.length; i++) {
        arr_anticode[i] = Number(anticode[i]);
    }
    let cop = [];
    while (arr_codePrfr.length !== 0) {
        a = arr_codePrfr.shift();
        b = arr_anticode.shift();
        g.add(a, b);
        if (arr_codePrfr.indexOf(a) === -1) {
            arr_anticode.unshift(a);
            arr_anticode.sort();
        }
        cop = arr_anticode;
    }
    g.add(arr_anticode[0], arr_anticode[1]);
    console.log(g.verts);
}