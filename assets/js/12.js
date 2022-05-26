$(document).ready(function () {
    $('.drawColor').on('click', function () {
        drawColor();
    });
});

function drawColor() {
    let n = G.verts.length - 1;
    let a = [];
    for (let i = 0; i < n; i++) {
        a[i] = [];
        for (let j = 0; j < n; j++) {
            if (i == j) a[i][i] = 1;
            else a[i][j] = 0;
        }
    }

    G.verts.forEach(function (elem) {
        if (this != undefined) for (const el of elem.edges) {
            a[elem.id - 1][el[0] - 1] = 1;
            a[el[0] - 1][elem.id - 1] = 1;
        }
    })

    let test = graphColoring(a);
    let colors = [];
    for (let i = 1; i <= n; i++) {
        let c = test[i - 1];
        if (colors[c] == undefined) {
            colors[c] = getRandomColor();
        }
        $('.point[value="' + i + '"]').css({background: colors[c]});
    }
}

function merge(ar1, ar2) {
    let res = [];
    for (let i = 0; i < ar1.length; i++) {
        res[i] = ar1[i] + ar2[i];
    }
    return res;
}

function graphColoring(matrix) {
    let visit = [], k = 1, colored = [];
    for (let i = 0; i < matrix.length; i++) {
        if (!visit[i]) {
            visit[i] = true;
            for (let j = 0; j < matrix[i].length; j++) {
                if (!matrix[i][j]) {
                    colored[i] = k;
                    colored[j] = colored[j] || k;
                    visit[j] = true;
                    matrix[i] = merge(matrix[i], matrix[j]);
                }
            }
            k++;
        }
    }
    return colored;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
